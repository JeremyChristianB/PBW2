import express from 'express';
import { getAvailableCourseNameHandler, getCourseAvailabilityHandler } from '../controllers/CourseController.js';

const apiRoutes = express.Router();

apiRoutes.get('/available-courses', getCourseAvailabilityHandler);
apiRoutes.get('/courses', getAvailableCourseNameHandler);

export default apiRoutes;
