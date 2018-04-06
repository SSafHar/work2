export interface Event {
  id: string;
  description;
  start;
  end;
  currency;
  invite_only;
  is_free;
  locale;
  logo;
  name;
  url;
  venue_id;
  venue: Venue
}

export interface EventResponse {
  events: Event[];
}

export interface Venue {
  address: Address;
  latitude: string;
  longitude: string;
  id: string;
  name: string;
}

export interface Address {
  address_1: string;
  city: string;
  country: string;
  region: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
