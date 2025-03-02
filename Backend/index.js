const express = require("express");
const cors = require("cors");
const {connectDB} = require('./dbConfig/DBConnect');
const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoutes');
require("dotenv").config();


const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow frontend domain
    credentials: true, // Allow cookies if needed
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.listen(3030, ()=>{
    try {
        console.log("Server is running on http://localhost:3030");
        connectDB();
    } catch (error) {
        console.log(error);
    }
});

