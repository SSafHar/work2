import * as express from 'express';
import { eventRouter } from './event.route';
import { imageRoute } from './image.route';
import { videoRouter } from './video.route';

export const apiRouter = express.Router();

apiRouter.use('/video', videoRouter);
apiRouter.use('/event', eventRouter);
apiRouter.use('/image', imageRoute);

apiRouter.use((req, res) => {
  res.status(404).end();
});

