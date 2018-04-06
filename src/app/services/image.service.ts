import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../common/image.model';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get<Image[]>('/api/image/list');
  }
}
