import * as express from 'express';
import { VideoEntity } from '../entities/video.entity';

const videoEntity = new VideoEntity();

/**
 * Video Router
 * */

export const videoRouter = express.Router();

videoRouter.get('/list', (req, res) => {
  videoEntity.getVideoList().then((r) => res.json(r))
    .catch((err) => res.status(500).json(err));
});
