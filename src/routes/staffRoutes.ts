import { Router } from "express";
import { registerStaff, loginStaff, registerWork } from "../controllers/staffController";
import { auth } from "../middleware/auth";
import { isWorker } from "../middleware/isWorker"
import { isAdmin } from "../middleware/isAdmin";


const router = Router();

router.post('/register', auth, isAdmin, registerStaff);
router.post('/login', loginStaff)
router.post('/addwork',  auth, isWorker, registerWork)
// router.get('/profile', auth, isWorker, profile)
// router.put('/profile', auth, updateProfile)

export { router };