const express = require("express");
const cors = require("cors");
const {connectDB} = require('./dbConfig/DBConnect');
const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
const postRoutes = require('./routes/PostRoutes');
require("dotenv").config();


const app = express();


// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from Origin: ${req.headers.origin}`);
  next();
});

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", // Local development
      "https://community-hub-full-stack-website.vercel.app", // Production frontend
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable if you use cookies or auth tokens
}));//to allow cross origin requests from the frontend to the backend server
//  because the frontend and backend are running on different ports so we need to allow the cross origin requests 
//  from the frontend to the backend server so that the frontend can communicate with the backend server 


// Handle preflight OPTIONS requests
app.options('*', cors());

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());

 //to pass the form data from the frontend to the backend server 
app.use(express.urlencoded({ extended: false }));


// app.use(cors());   //to allow cross origin requests from the frontend to the backend server

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);



// Test endpoint to verify server is alive
app.get('/test', (req, res) => {
    res.json({ message: 'Server is alive' });
  });

const PORT=process.env.PORT || 9000

app.listen(PORT, async()=>{
    try {
        await connectDB();
        console.log(`Server is running on http://localhost:${PORT}`);
        
    } catch (error) {
        console.log(error);
    }
});

