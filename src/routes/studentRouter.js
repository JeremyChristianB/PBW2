import express from 'express';
import { checkAuthentication, checkAuthorization } from '../middlewares/session.js';
import CONSTANT from '../config/constant.js';

const studentRoutes = express.Router();

studentRoutes.get('/student', checkAuthorization(CONSTANT.ROLE.STUDENT), (req, res) => {
  res.render('student/homepageStudent');
});

export default studentRoutes;
