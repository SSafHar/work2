import { Component, Host, Input, OnInit } from '@angular/core';
import { Banner } from '../../common/banner.model';
import { PageSliderParentDirective } from './page-slider-parent.directive';

@Component({
  selector: 'app-page-slider',
  templateUrl: './page-slider.component.html',
  styleUrls: ['./page-slider.component.scss']
})
export class PageSliderComponent implements OnInit {
  @Input('banners') banners: Banner[];
  selectedFragment: string;
  private firstFragment: string;

  constructor(@Host() private parent: PageSliderParentDirective) {
    this.parent.registerSlider(this);
  }

  ngOnInit() {
    const {banners} = this;
    const firstFragment = banners[0].fragment;
    this.firstFragment = firstFragment;
    this.selectedFragment = firstFragment;
  }

  // todo: notify parent about changes

  select(fragment: string) {
    this.selectedFragment = fragment || this.firstFragment;
    this.parent.select(fragment);
  }
}
