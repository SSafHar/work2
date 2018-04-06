import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent {
  images = {
    bgImageUrl: 'https://scontent.fevn2-1.fna.fbcdn.net/v/t1.0-9/29606_10151163948908542_666088' +
    '299_n.jpg?oh=0ef4ad4a081dc4646e3b7f4fa9b21809&oe=5B339A3E',
    armImage: 'https://cdn3.breitlingforbentley.com/bundles/breitlingretailers/images/maps/' +
    'asset-version-e3e5317eb8-AM.png',
    spainImage: 'https://d30y9cdsu7xlg0.cloudfront.net/png/922251-200.png',
    usImage: 'https://d30y9cdsu7xlg0.cloudfront.net/png/536080-200.png',
    italyImage: 'https://www.123-stickers.com/762-762-large/italie.jpg'
  };
}
