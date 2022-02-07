import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import bookRoutes from './routes/books.js';
import authRoutes from './routes/auth.js';
import commentsRoutes from './routes/comments.js';
import bookingRoutes from './routes/bookings.js';
import dotenv from 'dotenv';


const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config()
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    app.listen(PORT, ()=> console.log(`------------- Server Running on PORT ${PORT} ----------------------`))
}).catch((error)=> {
    console.log(`------------------------------ ${error.message} -----------------------------`);
})
// mongoose.set('useFindAndModify', false);

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentsRoutes)
app.use('/api/bookings', bookingRoutes)
