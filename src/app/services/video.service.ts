import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse } from '../common/helper-types';
import { Video } from '../common/video.model';

@Injectable()
export class VideoService {
  constructor(private http: HttpClient) { }

  getVideos() {
    return this.http.get<PageResponse<Video[]>>('/api/video/list');
  }
}
