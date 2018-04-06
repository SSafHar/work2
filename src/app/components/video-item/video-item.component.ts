import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Duration } from '../../common/video.model';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {
  @Input() video;
  selected;
  duration: Duration = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    const sizes = this.video.pictures.sizes;
    this.selected = sizes.find(item => item.width === 295);
    this.formatDuration();
  }

  play() {
    const dialogRef = this.dialog.open(VideoDialogComponent, {
      data: this.video
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  formatDuration() {
    const secs = this.video.duration % 60;
    const mins = this.video.duration / 60 | 0;

    this.duration = {
      mins: mins + '',
      secs: (secs < 10 ? '0' : '') + secs
    };
  }
}
