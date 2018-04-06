import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  icons = {
    linkedIn: 'https://www.icon2s.com/img256/256x256-black-white-android-linkedin.png',
    face: 'https://image.flaticon.com/icons/svg/23/23747.svg',
    vimeo: 'https://cdn0.iconfinder.com/data/icons/social-glyph/30/vimeo-480.png'
  };
}
