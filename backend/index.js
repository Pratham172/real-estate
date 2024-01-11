import express from 'express';
import mongoose from 'mongoose';
import UserRouter from './routes/user.route.js';

const app = express();

// seting up server in port 7000
app.listen(7000, ()=> {
    console.log("server is running on port 7000!!");
});

// connection to mongo database
const mongoUrl = "mongodb://127.0.0.1/real_estate"
mongoose.connect(mongoUrl)
.then(()=> {
    console.log("-----------------")
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err);
});


app.use("/api/user",UserRouter);