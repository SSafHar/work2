import { Component } from '@angular/core';


@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent {
  data = {
    imageUrl: '/assets/images/Juan-Pardo-36.JPG',
    image: 'https://scontent.fevn2-1.fna.fbcdn.net/v/t1.0-9/29606_10151163948908542_666088' +
    '299_n.jpg?oh=0ef4ad4a081dc4646e3b7f4fa9b21809&oe=5B339A3E'
  };
}
