import {signUp,login} from '../Controller/authController.js';
import express from 'express';
const router = express.Router();
router.post('/signup',signUp);
router.post('/login',login);
export default router;