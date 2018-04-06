import * as fs from 'fs';

export const readJson =  (path) => new Promise<any>((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    err ? reject(err) : resolve(JSON.parse(data));
  });
});

