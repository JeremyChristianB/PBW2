import express from 'express';
import { signupTeacher, signupStudent, login, logout, addClass} from '../controllers/AccountController.js';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' })
const accountRoutes = express.Router();

accountRoutes.post('/signup-teacher', upload.single('picture'), signupTeacher);
accountRoutes.post('/signup-student', upload.single('picture'), signupStudent);
accountRoutes.post('/account/login', login);
accountRoutes.post('/account/logout', logout);
accountRoutes.post('/openclass-teacher', addClass);

export default accountRoutes;
