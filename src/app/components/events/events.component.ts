import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../common/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [
    trigger('open', [
      state('opened', style({
        height: '*'
      })),
      state('*', style({
        height: '90px'
      })),
      state('void', style({
        height: 0
      })),
      transition('* <=> *', animate('900ms ease-in')),
      transition('void <=> *', animate('120ms ease-in'))
    ])
  ]
})
export class EventsComponent implements OnInit {
  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data.events;
    });
  }
}
