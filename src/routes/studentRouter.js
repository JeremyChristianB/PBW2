import express from 'express';
import { checkAuthentication, checkAuthorization } from '../middlewares/session.js';
import CONSTANT from '../config/constant.js';
import { updateStudentProfile } from '../models/student.js';

const studentRoutes = express.Router();

studentRoutes.get('/student', checkAuthorization(CONSTANT.ROLE.STUDENT), (req, res) => {
  res.render('student/homepageStudent');
});

studentRoutes.post('/students/edit', updateStudentProfile);

export default studentRoutes;
