import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as bodyParser from 'body-parser';

import * as express from 'express';
import { join } from 'path';
import 'reflect-metadata';
// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import { apiRouter } from './api/';
import { dataRouter } from './data';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4002;
const DIST_FOLDER = join(__dirname, '..');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../server/main.bundle');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP),
    {
      provide: APP_BASE_HREF,
      useValue: `http://localhost:${PORT}`
    }
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));


/**
 * Backend
 * */
app.use('/api', apiRouter);
app.use('/data', dataRouter);



// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
export const server = app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
