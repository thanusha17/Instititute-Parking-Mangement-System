import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js'; // Importing the database connection
import cookieParser from 'cookie-parser'; // For handling cookies
import authRoutes from './routes/authRoutes.js'; // Import your auth routes
import adminRoutes from './routes/adminRoutes.js'; // Import your admin routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true // Enable cookies and authentication headers if required
  }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Enables cookie handling

// Sample route to verify database connection
app.get('/', (req, res) => {
    res.send('MySQL connection successful!');
});

// Authentication Routes
app.use('/auth', authRoutes);
app.use('/admin',adminRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
