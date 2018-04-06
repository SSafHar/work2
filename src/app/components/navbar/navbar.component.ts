import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Banner } from '../../common/banner.model';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  banners: Banner[];
  selectedFragment: string;
  selectedLanguage = 'en';
  navOpened = false;

  constructor(private bannerService: BannerService, private translate: TranslateService) {
    translate.setDefaultLang(this.selectedLanguage);
    translate.use(this.selectedLanguage);
  }

  ngOnInit() {
    this.bannerService.getBanners().subscribe((banners) => this.banners = banners);
    this.bannerService.selectedFragment.subscribe((fragment) => this.selectedFragment = fragment);
  }

  select(fragment: string) {
    this.bannerService.selectedFragment.next(fragment);
    this.navOpened = false;
  }

  chooseEnglish() {
    this.selectedLanguage = 'en';
    this.translate.use('en');
  }

  chooseSpanish() {
    this.selectedLanguage = 'es';
    this.translate.use(this.selectedLanguage);
  }

  toggleNav() {
    this.navOpened = !this.navOpened;
  }
}
