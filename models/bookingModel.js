import mongoose from 'mongoose';


const bookingSchema = mongoose.Schema({
    title: String,
    description: String,
    author: String,
    isbns: [Number],
    volume: String,
    name: String,
    address: String,
    email: String,
    contact: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const bookingsModel = mongoose.model('Booking', bookingSchema);

export default bookingsModel;