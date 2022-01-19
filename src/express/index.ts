import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import logger from '../logger';

import {
  maintenance,
  athletes,
  admins,
  colleges,
  sports,
  coaches,
  tags,
  notes,
} from './routers';

import { unhandled, errors } from './controllers';

import {
  port,
  serviceName,
  routerLog,
  corsUrl,
  parserOptions,
} from '../config';

const app: Express = express();

if (routerLog.active) app.use(morgan(routerLog.format));

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use(express.json(parserOptions.json));
app.use(express.urlencoded(parserOptions.urlencoded));

// Routing
app.use(athletes);
app.use(notes);
app.use(admins);
app.use(colleges);
app.use(sports);
app.use(coaches);
app.use(tags);

// Service healthcheck
app.use(maintenance);

// Errors handler
app.use(unhandled);
app.use(errors);

function serviceRunner() {
  return app
    .listen(port, () =>
      logger.info(`🚀 :: ${serviceName} is running on port :: ${port}`)
    )
    .on('error', logger.error);
}

export { app, serviceRunner };
