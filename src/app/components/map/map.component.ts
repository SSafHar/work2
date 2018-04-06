import { isPlatformServer } from '@angular/common';
import { APP_ID, Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID } from '@angular/core';
import { Coordinates } from '../../common/event.model';

declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() coordinates: Coordinates;
  private map;
  private marker;
  private isServer: boolean;

  constructor(private element: ElementRef,
              @Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string) {
    this.isServer = isPlatformServer(platformId);
  }

  ngOnInit() {
    if(this.isServer) {
      return;
    }
    this.map = new google.maps.Map(this.element.nativeElement, {
      center: this.coordinates,
      zoom: 14
    });
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map
    });
  }

  ngOnChanges(changes) {
    if(!changes.coordinates || !this.map) {
      return;
    }
    this.map.setCenter(this.coordinates);
    this.marker.setPosition(this.coordinates);
  }
}
