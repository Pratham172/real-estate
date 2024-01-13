import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {errorHandler} from '../utils/custom.error.js';
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json("User created successfully")
    }
    catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User Not Found!"));
        }
        const validPass = bcryptjs.compareSync(password, validUser.password);
        if (!validPass) {
            return next(errorHandler(401, "Please try to login with correct credentials!"));
        }
        const token = jwt.sign({ id: validUser._id, }, process.env.JWT_SECRET);
        const { password: pass, ...rest} = validUser._doc;
        res.cookie('token', token, { httpOnly: true})
            .status(200)
            .json(rest);

    } catch (error) {
        next(error);
    }
};