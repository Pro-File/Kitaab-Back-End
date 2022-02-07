import express from "express";
import { addBooking, getBookings } from "../controllers/bookingsController.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getBookings);
router.post('/', auth, addBooking);

export default router;
