import { Router } from "express";
import { register, login, profile, updateProfile, createAppointment, getAllMyAppointments, getSingleAppointment, deleteAppointment, updateAppointment, getAllTattooArtist, getAllTattoos } from "../controllers/userController";
import { auth } from "../middleware/auth";
import { isUser } from "../middleware/isUser";


const router = Router();

router.post('/register', register);
router.post('/login', login)

router.get('/getalltattooartist', getAllTattooArtist)
router.get('/alltattoos', getAllTattoos)

router.get('/profile', auth, isUser, profile)
router.put('/profile', auth, isUser, updateProfile)

router.post('/appointment', auth, isUser, createAppointment)
router.get('/myappointments', auth, isUser, getAllMyAppointments)
router.get('/myappointments/:id', auth, isUser, getSingleAppointment)
router.delete('/myappointments/:id', auth, isUser, deleteAppointment);
router.put('/myappointments/:id', auth, isUser, updateAppointment);



export { router };