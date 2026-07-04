import Inquiry from '../models/Inquiry.js';
import mongoose from 'mongoose';

export const handleContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All contact form fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address provided.' });
    }

    // Log to server console
    console.log('\n--- NEW INCOMING PORTFOLIO INQUIRY ---');
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message:\n${message}`);
    console.log('--------------------------------------\n');

    // Attempt to write to MongoDB if connected
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      try {
        const newInquiry = new Inquiry({ name, email, subject, message });
        await newInquiry.save();
        console.log('Saved to MongoDB successfully.');
      } catch (dbError) {
        console.error('Database save warning (falling back to console only):', dbError.message);
      }
    } else {
      console.log('MongoDB is offline. Inquiry logged to console only.');
    }

    return res.status(200).json({
      success: true,
      message: isDbConnected
        ? 'Message stored in MongoDB and logged successfully.'
        : 'Message logged to server console successfully (MongoDB offline).',
    });
  } catch (error) {
    console.error('Error processing contact inquiry:', error);
    return res.status(500).json({ error: 'Internal server error occurred.' });
  }
};

// GET all inquiries (passcode protected)
export const getInquiries = async (req, res) => {
  try {
    const passcode = req.headers['x-admin-passcode'];
    const expectedPasscode = process.env.ADMIN_PASSCODE || '123456';
    
    if (passcode !== expectedPasscode) {
      return res.status(401).json({ error: 'Unauthorized. Invalid admin passcode.' });
    }

    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      return res.status(503).json({ error: 'Database is currently offline. Cannot retrieve inquiries.' });
    }

    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, inquiries });
  } catch (error) {
    console.error('Error retrieving inquiries:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

// DELETE a specific inquiry (passcode protected)
export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const passcode = req.headers['x-admin-passcode'];
    const expectedPasscode = process.env.ADMIN_PASSCODE || '123456';

    if (passcode !== expectedPasscode) {
      return res.status(401).json({ error: 'Unauthorized. Invalid admin passcode.' });
    }

    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      return res.status(503).json({ error: 'Database is offline. Cannot delete inquiry.' });
    }

    const deleted = await Inquiry.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    return res.status(200).json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
