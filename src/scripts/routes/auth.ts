import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Register route
router.post("/register", async (req : Request, res : Response) : Promise<void> => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// Login route
router.post("/login", async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user || !await bcrypt.compare(password, user.password)) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET!, {expiresIn: "1h"});
        res.json({ token, userId: user._id });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

export default router;
