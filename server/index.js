import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

// Connect to Database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Express server is listening on port ${PORT}`);
  });
});
