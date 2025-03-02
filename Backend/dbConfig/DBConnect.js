const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB Atlas Successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connectDB}