import express from "express";
import { addComment, getComments, editComment, deleteComment} from "../controllers/commentController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', auth, getComments);
router.post('/', auth, addComment);
router.put('/:id',auth, editComment);
router.delete('/:id', auth, deleteComment);

export default router;
