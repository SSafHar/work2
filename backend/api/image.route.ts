import * as express from 'express';
import * as fs from 'fs';
import { join } from 'path';

const IMAGES_PATH = '/data/images';
const RELATIVE_IMAGES_PATH = join(__dirname, '..', IMAGES_PATH);

export const imageRoute = express.Router();

imageRoute.get('/list', (req, res) => {
  fs.readdir(RELATIVE_IMAGES_PATH, 'utf8', (err, files) => {
    if(err) {
      res.status(500).json(err);
    }

    res.json(files.map((img) => ({url: `${IMAGES_PATH}/${img}`})));
  });
});
