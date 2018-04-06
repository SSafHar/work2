import * as express from 'express';
import { join } from 'path';

export const dataRouter = express.Router();

dataRouter.use('/i18n', express.static(join(__dirname, './i18n')));
dataRouter.use('/images', express.static(join(__dirname, './images')));
dataRouter.use('/docs', express.static(join(__dirname, './docs')));

dataRouter.use((req, res) => {
  res.status(404).end();
});
