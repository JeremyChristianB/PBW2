import fs from 'fs';

export const getRoleData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('databases/role.json', 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        try {
          const roles = JSON.parse(data);
        //   console.log(roles);
          resolve(roles);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
};
