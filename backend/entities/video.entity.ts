import { Vimeo } from 'vimeo';
import { PageResponse } from '../../src/app/common/helper-types';
import { Video } from '../../src/app/common/video.model';

const CLIENT_ID = 'ef366180b54a96ec25fea891272bdcd48b03d9d3';
const CLIENT_SECRET = 'QMJ033HnVD2s9md/D/i9tYcpp8Tw2r0HVlmnaXWVigQQF/FataZ2S8lLoNmWm' +
  'K1UVKw9GjC787gveQltGS33x/0rUtq2klcfHy65T5JzZLguGlD48upZeL4Vp4kmPjZm';

const CHANNEL_NAME = 'juanpardo';

const CHANNEL_PATH = `/channels/${CHANNEL_NAME}/videos`;
const VIDEO_FIELDS = 'uri,name,duration,pictures';

const requestOptions = {
  path: CHANNEL_PATH,
  query: {
    fields: VIDEO_FIELDS
  }
};

export class VideoEntity {
  private client;
  private clientId = CLIENT_ID;
  private clientSecret = CLIENT_SECRET;
  private cachedVideoResponse = null as PageResponse<Video[]>;

  constructor() {}

  getVideoList() {
    if(this.cachedVideoResponse) {
      return Promise.resolve(this.cachedVideoResponse);
    }

    return this.initConnection().then((client) => new Promise((resolve, reject) => {
      client.request(requestOptions, (err, res: PageResponse<Video[]>) => {
        if(err) {
          return reject(err);
        }

        this.cachedVideoResponse = res;
        setTimeout(() => this.cachedVideoResponse = null, 60 * 1000);
        resolve(res);
      });
    }));
  }

  private initConnection() {
    if(this.client) {
      return Promise.resolve(this.client);
    }

    return new Promise((resolve, reject) => {
      const client = this.client = new Vimeo(this.clientId, this.clientSecret);

      client.generateClientCredentials(['public'], (err, response) => {
        if(err) {
          reject(err);
        }
        const token = response.access_token;
        client.setAccessToken(token);

        resolve(client);
      });
    });
  }
}
