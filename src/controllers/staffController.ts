import { Response, Request } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Staff } from "../models/Staff";
import { Product } from "../models/Product";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const today = new Date();
const todayFormated = dayjs(today).format("DD-MM-YYYY");
console.log(`Today is ${todayFormated}`);

const registerAdmin = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const adress = req.body.adress;
    const role = req.body.role;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newStaff = await Staff.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: encryptedPassword,
      phone: phone,
      adress: adress,
      role: role,
    }).save();

    return res.json({
      success: true,
      message: "God mode enabled",
      token: newStaff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "There is no... god",
      error: error,
    });
  }
};

const registerStaff = async (req: Request, res: Response) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const adress = req.body.adress;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    const newStaff = await Staff.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: encryptedPassword,
      phone: phone,
      adress: adress,
    }).save();

    return res.json({
      success: true,
      message: "Tattoo artist created succesfully",
      token: newStaff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Tattoo artist can't be created",
      error: error,
    });
  }
};

const loginStaff = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Staff.findOneBy({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: true,
        message: "User incorrect",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        success: true,
        message: "Password incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "3h",
      }
    );

    return res.json({
      success: true,
      message: "User logged succesfully",
      token: token,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Tattoo artist can't be loged",
      error: error,
    });
  }
};

// esto deberia ir en su Appointment controller
const getAllMyAppointments = async (req: Request, res: Response) => {
  try {
    const allmyappointments = await Appointment.find({
      where: {
        tattoo_artist_id: req.token.id,
      },
      relations: ["tattoo", "tattooArtist"],
    });

    return res.json({
      success: true,
      message: "All appointments user retrieved",
      data: allmyappointments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "worker can't get all appointments",
      error: error,
    });
  }
};

const getMyAppointment = async (req: Request, res: Response) => {
  try {
    const tattoo_artist_id = req.token.id;
    const appointment_id = req.params.id;

    const appointment = await Appointment.findOne({
      where: {
        id: parseInt(appointment_id as string),
        tattoo_artist_id: tattoo_artist_id,
      },
      relations: ["tattoo", "tattooArtist"],
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    return res.json({
      success: true,
      message: "Appointment retrieved",
      data: appointment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while retrieving appointment",
      error: error,
    });
  }
};

const updateMyAppointment = async (req: Request, res: Response) => {
    try {
        const appointmentIdToUpdate = req.params.id;
    
        const appointment = await Appointment.findOne({
          where: {
            id: parseInt(appointmentIdToUpdate),
            tattoo_artist_id: req.token.id,
          },
        });
    
        if (!appointment) {
          return res.status(404).json({
            success: false,
            message: "Appointment not found",
          });
        }
    
        if (req.body.observations) {
          appointment.observations = req.body.observations;
        }
        if (req.body.date) {
          appointment.date = req.body.date;
        }
        if (req.body.appointment_time) {
          appointment.appointment_time = req.body.appointment_time;
        }
    
        const myDateEntry = appointment.date as string;
        const myDateFormated = dayjs(myDateEntry, "YYYY-MM-DD", true).format(
          "DD-MM-YYYY"
        );
    
        const valiDate = (dateToday: string, appointmentDate: string) => {
          const appointmentDay = dayjs(appointmentDate).format("DD");
          const appointmentMonth = dayjs(appointmentDate).format("MM");
          const appointmentYear = dayjs(appointmentDate).format("YYYY");
    
          const day = dayjs(dateToday).format("DD");
          const month = dayjs(dateToday).format("MM");
          const year = dayjs(dateToday).format("YYYY");
    
          if (appointmentDate === dateToday) {
            return {
              success: false,
              message: "Appointments only available from the next day",
            };
          }
    
          const appointmentDateObj = dayjs(appointmentDate, "DD-MM-YYYY", true);
          const dateTodayObj = dayjs(dateToday, "DD-MM-YYYY", true);
          if (appointmentDateObj.isBefore(dateTodayObj, "day")) {
            return {
              success: false,
              message: "Time travel not allowed at this time",
            };
          }
    
          const weekDay = dayjs(appointmentDate, "DD-MM-YYYY", true).format("dddd");
          if (weekDay === "Saturday" || weekDay === "Sunday") {
            return {
              success: false,
              message: "Appointments not available on the weekend",
            };
          }
    
          return {
            success: true,
            message: "Appointment successfully validated, see you soon!",
          };
        };
    
        const validationResult = valiDate(todayFormated, myDateFormated); // validar la fecha
    
        if (!validationResult.success) {
          return res.status(400).json(validationResult);
        }
    
        const updatedAppointment = await appointment.save();
    
        return res.json({
          success: true,
          message: "Appointment updated successfully",
          data: updatedAppointment,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Appointment update failed",
          error: error,
        });
      }
    };

const registerWork = async (req: Request, res: Response) => {
  try {
    const tattooArtistId = req.token.id;
    const product_type = req.body.product_type;
    const title = req.body.title;
    const description = req.body.description;
    const img_url = req.body.img_url;
    const time_amount = req.body.time_amount;
    const price = req.body.price;

    const newTattoo = await Product.create({
      tattoo_artist_id: tattooArtistId,
      product_type: product_type,
      title: title,
      description: description,
      img_url: img_url,
      time_amount: time_amount,
      price: price,
    }).save();

    return res.json({
      success: true,
      message: "Tattoo created succesfully",
      data: newTattoo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Tattoo can't be created",
      error: error,
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userIdToDelete = req.params.id;
    const userDeleted = await User.delete({
      id: parseInt(userIdToDelete),
    });

    if (userDeleted.affected) {
      return res.json(
        `The user with ID:${userIdToDelete} has been successfully deleted.`
      );
    }
    return res.json(`Nothing to to delete here`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting user",
      error: error,
    });
  }
};

const deleteAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointmentIdToDelete = req.params.id;

    const appointment = await Appointment.findOne({
      where: {
        id: parseInt(appointmentIdToDelete),
        tattoo_artist_id: req.token.id,
      },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    await appointment.remove();

    return res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting appointment",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({
      where: {
        id: req.body.user_id,
      },
    });

    return res.json({
      success: true,
      message: "profile user retrieved",
      data: allUsers,
      // data: user?.email
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user can't get profile",
      error: error,
    });
  }
};

export {
  getMyAppointment,
  updateMyAppointment,
  registerStaff,
  loginStaff,
  registerWork,
  getAllMyAppointments,
  registerAdmin,
  deleteUserById,
  getAllUsers,
  deleteAppointmentById
};
