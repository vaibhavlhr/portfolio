import mongoose from 'mongoose';

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('Successfully connected to MongoDB.');
    return true;
  } catch (err) {
    console.error('MongoDB connection warning:', err.message);
    console.log('Server will run with database logging disabled. (Console logging active)');
    return false;
  }
};
