import { MongoClient, MongoClientOptions, Db } from 'mongodb';
import logger from '../../logger';

export default class MongoDb {
  private static instance: MongoDb;
  private static database: Db;

  private constructor(private readonly mongoClient: MongoClient) {}

  get client() {
    if (!MongoDb.instance || !this.mongoClient)
      throw Error('There is no connection to mongoDb');
    return this.mongoClient;
  }

  static async createConnection(
    url: string,
    database: string,
    option?: MongoClientOptions
  ) {
    if (MongoDb.instance) {
      return this.instance;
    }
    const mongoClient = new MongoClient(url, option);

    try {
      await mongoClient.connect();
      this.instance = new MongoDb(mongoClient);
      this.database = this.instance.client.db(database);

      logger.info('📑 :: MongoDb is connected');

      return this.instance;
    } catch (e) {
      throw Error('Cannot create connection to MondoDb');
    }
  }

  static connection() {
    if (!MongoDb.instance) throw Error('There is no connection to mongoDb');
    return this.instance;
  }

  static db() {
    if (!MongoDb.instance) throw Error('There is no connection to mongoDb');
    return this.database;
  }

  static async isConnected(): Promise<boolean> {
    return MongoDb.db().command({ ping: 1 });
  }

  static async close(): Promise<void> {
    return MongoDb.instance.client.close();
  }
}

export function getCollection<T>(name: string) {
  const db = MongoDb.db();
  return db.collection<T>(name);
}
