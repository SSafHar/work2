import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Video } from '../../common/video.model';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent {
  videoUrl: SafeUrl;

  constructor(private dialogRef: MatDialogRef<VideoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public video: Video,
              private sanitazer: DomSanitizer) {
    const match = /\d+$/.exec(video.uri);
    const url =  `https://player.vimeo.com/video/${match[0]}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=123102`;
    this.videoUrl = sanitazer.bypassSecurityTrustResourceUrl(url);
  }
}
