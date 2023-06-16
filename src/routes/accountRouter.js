import express from 'express';
import { signupTeacher, signupStudent, login, logout} from '../controllers/AccountController.js';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' })
const accountRoutes = express.Router();

accountRoutes.post('/signup-teacher', upload.single('picture'), signupTeacher);
accountRoutes.post('/signup-student', upload.single('picture'), signupStudent);
accountRoutes.post('/account/login', login);
accountRoutes.get('/account/logout', logout);

export default accountRoutes;
