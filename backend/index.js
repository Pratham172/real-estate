import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.listen(7000, ()=> {
    console.log("server is running on port 7000!!");
});

const mongoUrl = "mongodb://127.0.0.1/real_estate"
mongoose.connect(mongoUrl)
.then(()=> {
    console.log("-----------------")
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err);
});