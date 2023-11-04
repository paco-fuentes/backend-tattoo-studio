import { Router } from "express";
import { register, login, profile, updateProfile, createAppointment } from "../controllers/userController";
import { auth } from "../middleware/auth";


const router = Router();

router.post('/register', register);
router.post('/login', login)

router.get('/profile', auth, profile)
router.put('/profile', auth, updateProfile)

router.post('/appointment', createAppointment)

export { router };