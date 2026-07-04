import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'OK',
    dbStatus: isDbConnected ? 'Connected' : 'Disconnected (Offline Fallback Active)',
    message: 'Portfolio MERN backend is running.'
  });
});

export default app;
