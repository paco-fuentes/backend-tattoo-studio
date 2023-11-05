import { Router } from "express";
import { register, login, profile, updateProfile, createAppointment, getAllMyAppointments, getSingleAppointment } from "../controllers/userController";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";


const router = Router();

router.post('/register', register);
router.post('/login', login)

router.get('/profile', auth, isUser, profile)
router.put('/profile', auth, isUser, updateProfile)

router.post('/appointment', auth, isUser, createAppointment)
router.get('/myappointments', auth, isUser, getAllMyAppointments)
router.get('/myappointments/:id', auth, isUser, getSingleAppointment)

export { router };