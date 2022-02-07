import mongoose from "mongoose";
import booksModel from "../models/booksModel.js";

export const getBooks = async (req, res) => {
  if (!req.userId)
    return res.json({ message: "Unauthorized! Kindly Login / Sign In again!" });
  try {
    const booksData = await booksModel.find();
    res.status(200).json(booksData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addBook = async (req, res) => {
  const book = req.body;
  if (!req.userId)
    return res.json({ message: "Unauthorized! Kindly Login / Sign In again!" });
  const newBook = new booksModel(book);
  try {
    await newBook.save();
    res
      .status(200)
      .json({
        message: "Book Added Successfully!",
        data: { ...book, createdAt: Date.now() },
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  if (!req.userId)
    return res.json({ message: "Unauthorized! Kindly Login / Sign In again!" });
  try {
    const book = await booksModel.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  const { rating, userId } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No Book Found !" });
  const book = await booksModel.findById(req.params.id.toString());
  if (book) {
    try {
      const alreadyReviewed = book.reviews.find(
        (review) => review.user.toString() === userId.toString()
      );
      if (alreadyReviewed) {
        res.status(400).json({ message: "Book Already Reviewed!" });
      }

      const review = {
        rating: Number(rating),
        user: userId,
      };
      
      book.reviews.push(review);
      book.totalReviews = book.reviews.length;
      book.averageReviews =
      book.reviews.reduce((acc, item) => item.rating + acc, 0) /
      book.reviews.length;
      
      await book.save();
      res.status(200).json({ message: "Review added Successfully!", review });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(404).json({ message: error.message });
  }
};
