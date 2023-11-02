import { Router } from "express";
import { register, login, profile, updateProfile } from "../controllers/userController";


const router = Router();

router.post('/register', register);
router.post('/login', login)

router.get('/profile', profile)
router.get('/profile', updateProfile)

export { router };