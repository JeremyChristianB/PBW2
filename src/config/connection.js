import mysql from 'mysql2/promise';
import { promisify } from 'util';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elearning'
});

// Promisify the getConnection function
const getConnection = promisify(pool.getConnection).bind(pool);

// Promisify the query function
pool.query = promisify(pool.query).bind(pool);

export { getConnection, pool };
