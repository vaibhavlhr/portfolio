import express from 'express';
import { handleContactForm, getInquiries, deleteInquiry } from '../controllers/contactController.js';

const router = express.Router();

router.post('/contact', handleContactForm);
router.get('/contact', getInquiries);
router.delete('/contact/:id', deleteInquiry);

export default router;
