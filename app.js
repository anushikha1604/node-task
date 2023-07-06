import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import storeRoutes from './routes/store.js';
import customerRoutes from './routes/customer.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/customer', customerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
