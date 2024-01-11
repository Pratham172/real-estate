import express from 'express';
import mongoose from 'mongoose';
import UserRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

const app = express();
app.use(express.json());

// seting up server in port 7000
app.listen(7000, ()=> {
    console.log("server is running on port 7000!!");
});

// connection to mongo database
const mongoUrl = "mongodb://127.0.0.1/real_estate"
mongoose.connect(mongoUrl)
.then(()=> {
    console.log("--------------------")
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err);
});

// routing user
app.use('/api/user',UserRouter);
// routing for authentication
app.use('/api/auth', authRouter);

// middlewear
app.use((err, req, res, next)=> {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

