import mongoose from "mongoose";
import bookingModel from "../models/bookingModel.js";

export const getBookings = async (req, res) => {
  if (!req.userId)
    return res.json({ message: "Unauthorized! Kindly Login / Sign In again!" });
  try {
    const bookings = await bookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addBooking = async (req, res) => {
  const booking = req.body;
  if (!req.userId)
    return res.json({ message: "Unauthorized! Kindly Login / Sign In again!" });
  const newBooking = new bookingModel(booking);
  try {
    await newBooking.save();
    res.status(200).json({
      message: "Book Requested Successfully!",
      data: { ...booking, createdAt: Date.now() },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
