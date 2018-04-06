import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Banner } from '../common/banner.model';

const BANNERS = [
  {fragment: 'home', nameKey: 'navbar.links.home'},
  {fragment: 'biography', nameKey: 'navbar.links.biography'},
  {fragment: 'master-class', nameKey: 'navbar.links.masterClass'},
  {fragment: 'events', nameKey: 'navbar.links.events'},
  {fragment: 'media', nameKey: 'navbar.links.media'},
  {fragment: 'contact', nameKey: 'navbar.links.contactUs'}
] as Banner[];

@Injectable()
export class BannerService {
  selectedFragment = new BehaviorSubject<string>('');
  private banners = Observable.of(BANNERS);

  getBanners() {
    return this.banners;
  }
}
