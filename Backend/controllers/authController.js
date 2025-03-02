const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const sendEmail = require('../utils/sendEmail')
const crypto = require("crypto");
// const redis = require("../utils/redisClient");
dotenv.config()

const salt_round = Number(process.env.SALT_ROUND)

exports.register = async(req ,res)=>{
    try {
        const { username, email, password, role} = req.body
        let user = await User.findOne({ username})
        let userE = await User.findOne({ email })
        if (user || userE){
            return res.status(400).json({ message: "username already exists" })
        }
        // hashed password
        const hashedPassword = await bcrypt.hash(password, salt_round)

        // Generate email verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        user = new User({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            role: role || "user" 
        })
        await user.save()

        // Send email verification link
        const verificationLink = `${process.env.CLIENT_URL}/auth/verify-email?token=${verificationToken}`;
        await sendEmail(email, "Verify Your Email", `Click here to verify your email: ${verificationLink}`);

        res.status(201).json({ message: 'User reigstered successfully ! check your email to verify your account', user: { username,  email, role: user.role}})
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message})
        
    }
}

exports.login = async(req, res)=>{
    try {
        const { username, email, password} = req.body

        //find user
        const userE = await User.findOne({ email});
        const user = await User.findOne({ username });
        if (!user || !userE){
            return res.status(400).json({ message: 'User not Round'})
        }

        //check if user is verified
        if (!userE.isVerified){
            return res.status(400).json({ message: "please verify your email first"})
        }
        
        if (user.email === userE.email){
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch){
             return res.status(400).json({ message: 'Password not Matched'})
            }
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d'})
            res.json({  message: "Login successful",token, user: { id: user._id, username: user.username, role: user.role }})

        }
        else{
            return res.json({ message: "user email not matched"})
        }
        //compare password
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })        
    }
}

exports.verifyEmail = async (req, res)=>{
    try {
        const { token } = req.query;

        //find user by verification token
        const user = await User.findOne({ verificationToken: token })
        if (!user){
            return res.status(400).json({ message: "invalid or expired token"})
        }

        // mark as verified & remove token
        user.isVerified = true;
        user.verificationToken = null
        await user.save()

        res.status(200).json({  message: "email verified! you can now log in."})
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.adminLogoutUser = async (req, res)=>{
    try {
        const { id } = req.params;
        const { blocked } = req.body
  

        // Only admin can update this
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const user = await User.findById(id);
  
        // Store the token in Redis blacklist with expiration
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.blocked = blocked
        user.save()

        res.json({ message: `User ${blocked ? "blocked" : "unblocked"} successfully`, user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
