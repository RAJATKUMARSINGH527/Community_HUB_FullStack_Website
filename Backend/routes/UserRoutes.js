const express = require('express')
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController')
const { authMiddleware, roleMiddleware} = require("../middleware/authMiddleware")

const router = express.Router()

router.get('/', authMiddleware, roleMiddleware(["Admin"]), getAllUsers)
router.get('/:id', authMiddleware,  getUserById)
router.put('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, roleMiddleware(["Admin"]), deleteUser)

module.exports = router
