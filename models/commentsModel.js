import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
  id: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
  },
});

const commentsModel = mongoose.model("Comments", commentsSchema);
export default commentsModel;
