import { pool } from './connection.js';
import fs from 'fs';

const dataRole = fs.readFileSync('src/databases/role.json', { encoding: 'utf-8' });

(async () => {
  try {
    const roles = JSON.parse(dataRole);

    for (let index = 0; index < roles.length; index++) {
      const role = roles[index];
      const sql = "INSERT INTO role (id, role_name) VALUES (?, ?)";
      const values = [role.id, role.role_name];

      await pool.execute(sql, values);
      console.log('Success insert role data', index);
    }

    pool.destroy();
  } catch (err) {
    console.log(err.stack);
  }
})();
