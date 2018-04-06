import * as express from 'express';
import * as fetch from 'node-fetch';
import { EventResponse } from '../../src/app/common/event.model';

const CLIENT_SECRET = 'VYEMNV53MWWN7ID5PGWHIPRSGJI5FVQHMKPWLLNVH4P5GHAJ72';
const PERSONAL_AUTH_TOKEN = 'MFJPVGAOPXC43SX7YFQT';
const ANONYMOUS_AUTH_TOKEN = 'IUG6QESZYWSCIYLWONXT';

const API_HOST = 'https://www.eventbriteapi.com/v3';
const TOKEN = `token=${PERSONAL_AUTH_TOKEN}`;

export const eventRouter = express.Router();

eventRouter.get('/list', (req, res) => {
  fetch(`${API_HOST}/users/me/events/?${TOKEN}`)
    .then(r => r.json() as EventResponse)
    .then(data => {
      Promise.all(data.events.map((event => {
        return fetchVenue(event.venue_id)
          .then(venue => event.venue = venue);
      }))).then(() => res.json(data));
    });
});

const fetchVenue = (venueId) => {
  return fetch(`${API_HOST}/venues/${venueId}/?${TOKEN}`)
    .then(r => r.json());
};
