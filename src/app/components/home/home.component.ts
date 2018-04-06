import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = null;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.imageService.getImages().subscribe((images) => this.images = images);
  }
}
