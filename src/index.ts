import { serviceRunner } from './express';
import Postgres from './databases/postgre';
import MongoDb from './databases/mongodb';
import Elastic from './databases/elastic';

import {
  mongoUrl,
  mongoDb,
  mongoOptions,
  elasticOptions,
  postgresOptions,
} from './config';

MongoDb.createConnection(mongoUrl, mongoDb, mongoOptions);
Postgres.createConnection(postgresOptions);
Elastic.createConnection(elasticOptions);

serviceRunner();
