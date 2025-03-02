const express = require("express");
const cors = require("cors");
const {connectDB} = require('./dbConfig/DBConnect');
const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoutes');
require("dotenv").config();


const app = express();
// app.use(cors({
//     origin: "http://localhost:5173/", // Allow frontend domain
//     credentials: true, // Allow cookies if needed
//     methods: ["GET", "POST", "PUT", "DELETE"] // Allow only GET, POST, PUT, DELETE
// }));
app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.listen(5000, async()=>{
    try {
        await connectDB();
        console.log("Server is running on http://localhost:5000");
        
    } catch (error) {
        console.log(error);
    }
});

