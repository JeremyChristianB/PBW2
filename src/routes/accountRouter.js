import express from 'express';
import { signupTeacher, signupStudent, login, logout} from '../controllers/AccountController.js';

const accountRoutes = express.Router();

accountRoutes.post('/signup-teacher', signupTeacher);
accountRoutes.post('/signup-student', signupStudent);
accountRoutes.post('/account/login', login);
accountRoutes.get('/account/logout', logout);

export default accountRoutes;
