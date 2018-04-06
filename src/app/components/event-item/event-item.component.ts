import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Coordinates, Event, Venue } from '../../common/event.model';
import { getRandomHexColor } from '../../common/helper-methods';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {
  @Input() event: Event;
  @HostBinding('style.border-left-color') color: string;
  opened = false;
  venue: Venue;
  startDate = null;
  endDate = null;
  coordinates: Coordinates;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const {venue} = this.event;
    this.venue = venue;
    this.coordinates = {
      lat: +venue.latitude,
      lng: +venue.longitude
    };
    this.formatDates();
    this.color = getRandomHexColor();
  }

  formatDates() {
    const sDate = new Date(this.event.start.utc);
    const eDate = new Date(this.event.end.utc);
    this.startDate = {
      hour: moment(sDate).format('hh:mm a'),
      day: moment(sDate).format('DD'),
      month: moment(sDate).format('MMM'),
      weekDay: moment(sDate).format('dddd')
    };
    this.endDate = {
      hour: moment(eDate).format('hh:mm a')
    };
  }

  toggleOpened() {
    if(!this.opened) {
      this.element.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
    this.opened = !this.opened;
  }
}
