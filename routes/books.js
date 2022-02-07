import express from "express";
import { addBook, getBooks, getBook, addReview } from "../controllers/booksController.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getBooks);
router.post('/', auth, addBook);
router.get('/:id', auth, getBook);
router.post('/:id/review', auth, addReview)

export default router;
