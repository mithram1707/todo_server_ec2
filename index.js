import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './Db/db.js';
import lmsRoutes from './Routes/lmsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDb();

// Routes
app.use('/api', lmsRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'LMS Backend Server is running!' });
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});