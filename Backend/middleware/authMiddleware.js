const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// const redis = require("../utils/redisClient");
const User = require('../models/User')
dotenv.config()

exports.authMiddleware = async (req, res, next)=>{
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
    
        const verifed = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifed
        const newUser = await User.findById(req.user.id)
     
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }
        console.log(newUser.blocked)
        if (newUser.blocked) {
            return res.status(403).json({ message: "Your account is blocked by the admin." });
        }
        // console.log(req.user)

       
        next()
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' })
    }
}

exports.roleMiddleware = (roles)=> (req, res, next)=>{
    if (!roles.includes(req.user.role)){
        return res.status(403).json({ message: 'Forbidden'})
    }
    next()
}