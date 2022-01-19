import { Pool, PoolConfig, QueryResult } from 'pg';

import logger from '../../logger';

export type Query = {
  name: string;
  text: string;
  values: (string | number)[];
};

export default class Postgres {
  private static instance: Postgres;

  constructor(private pool: Pool) {}

  static async createConnection(config: PoolConfig) {
    if (Postgres.instance) {
      return this.instance;
    }

    try {
      const pool = new Pool(config);

      await pool.query('SELECT NOW()');

      this.instance = new Postgres(pool);

      logger.info('🗂️  :: PostgreSQL is connected');

      return this.instance;
    } catch (e) {
      throw Error('Cannon create connection to PostgreSQL');
    }
  }

  static async query<T>(req: Query): Promise<QueryResult<T> | undefined> {
    try {
      const start = Date.now();
      const res = Postgres.instance.pool.query<T>(req);
      const duration = Date.now() - start;

      logger.info(`SQL query: ${req.name} ~ ${duration} (ms)`);

      return res;
    } catch (error) {
      logger.error(`SQL query: ${req.name} > ${error}`);
    }
  }

  static async isConnected(): Promise<boolean> {
    if (!Postgres.instance) throw Error('There is no connection to PostgreSQL');

    try {
      const res = await Postgres.instance.pool.query('SELECT NOW()');

      return res ? true : false;
    } catch (e) {
      return false;
    }
  }

  static async close(): Promise<void> {
    if (!Postgres.instance) throw Error('There is no connection to PostgreSQL');

    return Postgres.instance.pool.end();
  }
}
