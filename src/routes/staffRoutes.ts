import { Router } from "express";
import { registerStaff } from "../controllers/staffController";
import { auth } from "../middleware/auth";
import { isWorker } from "../middleware/isWorker"


const router = Router();

router.post('/register', registerStaff);
// router.post('/login', login)

// router.get('/profile', auth, isWorker, profile)
// router.put('/profile', auth, updateProfile)

export { router };