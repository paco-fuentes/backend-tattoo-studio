import { Router } from "express";
import { registerStaff, loginStaff, registerWork, getAllMyAppointments, registerAdmin } from "../controllers/staffController";
import { auth } from "../middleware/auth";
import { isWorker } from "../middleware/isWorker"
import { isAdmin } from "../middleware/isAdmin";


const router = Router();
router.post('/admin', registerAdmin)
router.post('/register', auth, isAdmin, registerStaff);
router.post('/login', loginStaff)
router.post('/addwork',  auth, isWorker, registerWork)

router.get('/myappointments', auth, isWorker, getAllMyAppointments)
router.get('/myappointments', auth, isAdmin, getAllMyAppointments)

export { router };