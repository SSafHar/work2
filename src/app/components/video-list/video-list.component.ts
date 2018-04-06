import { Component, OnInit } from '@angular/core';
import { Video } from '../../common/video.model';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  videos: Video[];
  selectedVideos: Video[];

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    this.videoService.getVideos().subscribe(res => {
      this.videos = res.data;
      this.selectedVideos = this.videos;
    });
  }
}
