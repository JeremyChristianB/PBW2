import { pool } from '../config/connection.js';

export const insertUserData = async (params) => {
  const { email, password, role, teacher_id, student_id} = params;

  //console.log(params)
  // if (!email || !password || !role_id || !teacher_id) {
  //   throw new Error('Missing required parameters for inserting user account');
  // }

  const sql = "INSERT INTO users(email, password, role_id, teacher_id, student_id) VALUES (?, ?, ?, ?, ?)";
  const values = [email, password, role, teacher_id, student_id];

  console.log('data sedang dimasukkan')
  
  try {
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    throw new Error(`Error inserting user account: ${error}`);
  }

};


export const getUserData = (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  return new Promise(async (resolve) => {
    pool.execute(sql, [email])
    .then((data) => {
      if (data?.[0]) {
        resolve(data[0]?.[0])
      } else {
        resolve(null);
      }
    })
    .catch(() => {
      resolve(null);
    })
  })
};


export const getUserDataChart = () => {
  const sql = `SELECT role_id, COUNT(*) AS count FROM users WHERE role_id IN (1, 2) GROUP BY role_id;`;

  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      if (results && results.length > 0) {
        const teacherCount = results.find(result => result.role_id === 1)?.count || 0;
        const studentCount = results.find(result => result.role_id === 2)?.count || 0;

        const labels = ['Teacher', 'Student'];
        const data = [teacherCount, studentCount];

        const chartData = {
          labels,
          datasets: [
            {
              label: 'User Accounts',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };

        resolve(chartData);
      } else {
        resolve(null);
      }
    });
  });
};
