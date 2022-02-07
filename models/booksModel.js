import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        rating: { type: Number, required: true , default: 0},
        user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Auth',
        },
       },
      {
        timestamps: true,
      }
)

const booksSchema = mongoose.Schema({
    title: String,
    description: String,
    author: String,
    reviews: [reviewSchema],
    averageReviews : Number,
    totalReviews: Number,
    isbns: [Number],
    publisher: String,
    category: {
        type: [{
            label: String,
            value: Number,
        }],
        default: []
    },
    bookImage: String,
    oldPrice: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        default: 0,
    },
    pages: {
        type: Number,
        default: 0,
    },
    creator: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const booksModel = mongoose.model('Books', booksSchema);

export default booksModel;