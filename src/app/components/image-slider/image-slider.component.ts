import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { isPlatformServer } from '@angular/common';
import { Component, HostBinding, Inject, Input, OnChanges, PLATFORM_ID } from '@angular/core';
import { Image } from '../../common/image.model';

type Direction = -1 | 0 | 1;

export type Animatable<T> = T & {
  animationState: string;
};

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  animations: [
    trigger('slide', [
      state('*', style({
        opacity: 0
      })),
      state('current', style({
        left: 0,
        opacity: 1
      })),
      state('previous', style({
        left: '-100%',
        opacity: 1
      })),
      state('next', style({
        left: '100%',
        opacity: 1
      })),
      transition('* <=> *', animate('500ms ease-in'))
    ])
  ]
})

export class ImageSliderComponent implements OnChanges {
  @Input() images: Animatable<Image>[];
  @HostBinding('class.no-images') noImages = true;

  private selectionTarget: number;
  private direction: Direction = 0;
  private currentInd: number;
  private lastInd: number;
  private isServer: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isServer = isPlatformServer(platformId);
  }

  ngOnChanges(changes) {
    this.setStates(); // TODO delete when jsons are ready

    if(!changes.images) {
      return;
    }

    const noImages = !this.images || !this.images.length;
    this.noImages = noImages;

    if(this.noImages) {
      return;
    }

    this.lastInd = this.images.length - 1;
    this.selectionTarget = 0;
    this.currentInd = -1;
    this.setStates();
  }

  // previousImage() {
  //   if (this.currentInd <= 0) {
  //     this.selectionTarget = this.lastInd;
  //   } else {
  //     this.selectionTarget = this.currentInd - 1;
  //   }
  //   this.setStates();
  // }

  // nextImage() {
  //   console.log(this.lastInd);
  //   if (this.currentInd >= this.lastInd) {
  //     this.selectionTarget = 0;
  //   } else {
  //     this.selectionTarget = this.currentInd + 1;
  //   }
  //   this.setStates();
  // }

  selectImages(index) {
    this.selectionTarget = index;
    this.setStates();
  }

  setNextStates(ev: AnimationEvent) {
    if(ev.toState !== 'current') {
      return;
    }

    this.setStates();
  }

  private setStates() {
    if(this.isServer) {
      return;
    }

    const {lastInd, selectionTarget} = this;
    let {currentInd, direction} = this;

    if(currentInd === selectionTarget) {
      this.direction = 0;
      return;
    }

    if(!direction) {
      direction = currentInd < selectionTarget ? 1 : -1;
    }

    currentInd = currentInd + direction;

    const current = this.images[currentInd];
    current.animationState = 'current';

    if(currentInd !== 0) {
      this.images[currentInd - 1].animationState = 'previous';
    }

    if(currentInd !== lastInd) {
      this.images[currentInd + 1].animationState = 'next';
    }

    Object.assign(this, {direction, currentInd});
  }
}
