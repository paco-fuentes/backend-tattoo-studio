import { Router } from "express";
import { registerStaff, loginStaff, registerWork, getAllMyAppointments, registerAdmin, deleteUserById, getAllUsers, updateMyAppointment, getMyAppointment, deleteAppointmentById } from "../controllers/staffController";
import { auth } from "../middleware/auth";
import { isWorker } from "../middleware/isWorker"
import { isAdmin } from "../middleware/isAdmin";
// import { isSuperAdmin } from "../middleware/isSuperAdmin";


const router = Router();
router.post('/admin', registerAdmin);
router.post('/register', auth, isAdmin, registerStaff);
router.post('/login', loginStaff)
router.post('/addwork',  auth, isWorker, registerWork)

router.get('/myappointments', auth, isWorker, getAllMyAppointments)
router.get('/myappointments', auth, isAdmin, getAllMyAppointments)

router.get('/myappointment/:id', auth, isWorker, getMyAppointment)
router.put('/myappointment/:id', auth, isWorker, updateMyAppointment)
router.delete('/myappointment/:id', auth, isWorker, deleteAppointmentById)

router.delete('/deleteuser/:id', auth, isAdmin, deleteUserById)
router.get('/getallusers', auth, isAdmin, getAllUsers)

export { router };