import { pool } from '../config/connection.js';

export const insertCourseMeetings = async (params) => {
    const { student_id, teacher_id, datetime,  link} = params;

  
    const sql = "INSERT INTO course_meetings (student_id, teacher_id, datetime, link) VALUES (?, ?, ?, ?)";
    const values = [student_id, teacher_id, datetime, link];
  
    try {
      const [result] = await pool.execute(sql, values);
      return result;
    } catch (error) {
      throw new Error(`Error inserting course_meetings: ${error}`);
    }
  };


export const getAvailableSchedules = async (params) => {
  const { course_id, have_student } = params;

  const sql = `
  SELECT cm.id AS meeting_id, cm.datetime, cm.link,
       t.id AS teacher_id, t.photo, t.full_name, t.address, t.phone_number, t.rate,
       c.nama AS course_name
  FROM course_meetings cm
  JOIN teachers t ON cm.teacher_id = t.id
  JOIN course c ON t.course_id = c.id
  WHERE c.id = ?;
  `;
  const values = [course_id];

  if (have_student !== undefined) {
    if (have_student) {
      sql += ' AND cm.student_id IS NOT NULL';
    } else {
      sql += ' AND cm.student_id IS NULL';
    }
  }

  try {
    const [result] = await pool.execute(sql, values);

    return result.map(e => ({
      meeting_id: e.meeting_id,
      datetime: e.datetime,
      link: e.link,
      teacher: {
        teacher_id: e.teacher_id,
        photo: e.photo,
        full_name: e.full_name,
        address: e.address,
        phone_number: e.phone_number,
        rate: e.rate,
      },
      course_name: e.course_name,
    }))
  } catch (error) {
    throw new Error(`Error get course_meetings: ${error}`);
  }
}

export const searchTeacherByName = async (nama, student_id = '', teacher_id = '') => {
  let sql = `
  SELECT cm.id AS meeting_id, cm.datetime, cm.link, cm.student_id,
       t.id AS teacher_id, t.photo, t.full_name, t.address, t.phone_number, t.rate,
       c.nama AS course_name
  FROM course_meetings cm
  JOIN teachers t ON cm.teacher_id = t.id
  JOIN course c ON t.course_id = c.id
  WHERE t.full_name LIKE ?
  `;
  const values = [`%${nama}%`];

  if (student_id) {
    sql += ' AND cm.student_id = ?';
    values.push(student_id)
  }
  if (teacher_id) {
    sql += ' AND cm.teacher_id = ?';
    values.push(teacher_id)
  }

  try {
    const [result] = await pool.execute(sql, values);

    return result.map(e => ({
      meeting_id: e.meeting_id,
      datetime: e.datetime,
      link: e.link,
      student_id: e.student_id,
      teacher: {
        teacher_id: e.teacher_id,
        photo: e.photo,
        full_name: e.full_name,
        address: e.address,
        phone_number: e.phone_number,
        rate: e.rate,
      },
      course_name: e.course_name,
    }))
  } catch (error) {
    throw new Error(`Error get course_meetings: ${error}`);
  }
};

export const deleteCourseMeetingById = async (id) => {
  const sql = `DELETE FROM course_meetings WHERE id = ?`;
  const values = [id];

  try {
    const [result] = await pool.execute(sql, values);
    console.log(result);
  } catch (error) {
    throw new Error(`Error get course_meetings: ${error}`);
  }
}


export const joinCourseMeetingById = async (id, student_id) => {
  const sql = `UPDATE course_meetings SET student_id = ? WHERE id = ? AND student_id IS NULL`;
  
  const values = [student_id, id];

  try {
    const [result] = await pool.execute(sql, values);
    console.log(result);
  } catch (error) {
    throw new Error(`Error get course_meetings: ${error}`);
  }
}