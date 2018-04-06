import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventResponse, Venue } from '../common/event.model';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<EventResponse>( `/api/event/list`);
  }

  getVenue(venueId) {
    return this.http.get<Venue>(`/api/event/venue/${venueId}`);
  }
}
