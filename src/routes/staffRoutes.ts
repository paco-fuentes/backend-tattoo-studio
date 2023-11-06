import { Router } from "express";
import { registerStaff, loginStaff, registerWork, getAllMyAppointments, registerAdmin, deleteUserById, getAllUsers } from "../controllers/staffController";
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

router.delete('/deleteuser/:id', auth, isAdmin, deleteUserById)
router.get('/getallusers', auth, isAdmin, getAllUsers)

export { router };