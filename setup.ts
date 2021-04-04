import { exec } from 'child_process';

export const setUp = () => {
  return new Promise((resolve, reject) => {
    exec('npm run db migrate:refresh && npm run db seed', (err, stdout) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
};