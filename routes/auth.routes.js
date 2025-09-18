// -------------------- dependency -----------------------------
const express = require("express");
const router = express.Router();
router.use(express.json());

const User = require("../models/user.models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const JWT_SECRET = process.env.JWT_SECRET;

// --------------------- user signup ----------------------------

router.post("/signup", async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({name, email, password: hashedPassword});
        const saveduser = await newUser.save();
        if (saveduser) {
            res
                .status(201)
                .json({"message": "User created succefully."});
        }
    } catch (error) {
        throw new Error("Invalid email or password.");
    }
})

// --------------------------------------------------------------



// --------------------- user login ----------------------------

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({message: "No token provided."});
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(402).json({error: "Invalid token." });
    }
}


router.post("/login", async (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({error: "Email and password are both required."});
    }

    const {email, password} = req.body;

    // find user with email
    try {
        const targetUser = await User.findOne({email});

        //compare hashed password with stored password
        const isPasswordValid = await bcrypt.compare(password, targetUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({error: "Invalid password."});
        }
        
        //generate jwt token
        const token = jwt.sign(
            {userId: targetUser._id, email: targetUser.email},
            JWT_SECRET, 
            {expiresIn: '24h'}
        );
        
        return res.status(200).json({token});
    } catch (error) {
        throw new Error("User Not found.")
    }
})

// -------------------------------------------------------------
module.exports = {router, verifyJWT}