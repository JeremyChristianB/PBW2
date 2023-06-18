import { getUserData, getUserDataChart } from '../models/user.js'

export const getUserDataHandler = async (req, res, next) => {
    const { student_id, teacher_id } = req.body; // Assuming the student_id and teacher_id are sent in the request body
  
    try {
      // Perform a database query to retrieve the data
      const data = await getUserDataChart(student_id, teacher_id);
  
      res.json({
        account: data,
      });
    } catch (error) {
      next(error);
    }
};