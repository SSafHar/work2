import { Component, OnInit } from '@angular/core';
import { Banner } from '../common/banner.model';
import { BannerService } from '../services/banner.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {
  banners: Banner[];
  selectedFragment = '';

  constructor(private bannerService: BannerService) {
  }

  ngOnInit() {
    this.bannerService.getBanners().subscribe((banners) => this.banners = banners);
    this.bannerService.selectedFragment.subscribe((fragment) => this.selectedFragment = fragment);
  }

  select(fragment) {
    this.bannerService.selectedFragment.next(fragment);
  }
}
