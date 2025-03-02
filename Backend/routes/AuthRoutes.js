const express = require('express')
const { register, login, verifyEmail, adminLogoutUser } = require('../controllers/authController')
const { authMiddleware, roleMiddleware } = require("../middleware/authMiddleware");
const router = express.Router()
// const { adminLogoutUser} = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.get("/verify-email", verifyEmail);
router.post('/admin/block-user/:id', authMiddleware,adminLogoutUser)

module.exports= router