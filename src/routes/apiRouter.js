import express from 'express';
import { getAvailableCourseNameHandler, getCourseAvailabilityHandler } from '../controllers/CourseController.js';
import { getUserDataHandler } from '../controllers/ChartController.js'

const apiRoutes = express.Router();

apiRoutes.get('/available-courses', getCourseAvailabilityHandler);
apiRoutes.get('/courses', getAvailableCourseNameHandler);
apiRoutes.get('/chart-data', getUserDataHandler);

export default apiRoutes;
