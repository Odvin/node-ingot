import { Client, ClientOptions, ApiResponse } from '@elastic/elasticsearch';
import logger from '../../logger';

export default class Elastic {
  private static instance: Elastic;

  private constructor(readonly esClient: Client) {}

  get client() {
    if (!Elastic.instance)
      throw Error('There is no connection to Elastic Search');
    return this.esClient;
  }

  static async createConnection(opts: ClientOptions) {
    if (Elastic.instance) {
      return this.instance;
    }
    try {
      const esClient = new Client(opts);

      await esClient.ping();

      this.instance = new Elastic(esClient);

      logger.info('🔍 :: ElasticSearch is connected');

      return this.instance;
    } catch (e) {
      throw Error('Cannot create connection to ElasticSearch');
    }
  }

  static async isConnected(): Promise<boolean> {
    if (!Elastic.instance)
      throw Error('There is no connection to ElasticSearch');
    const apiResponse: ApiResponse = await Elastic.instance.client.ping();

    return apiResponse.body ? true : false;
  }

  static async close(): Promise<void> {
    if (!Elastic.instance)
      throw Error('There is no connection to ElasticSearch');
    return Elastic.instance.client.close();
  }
}
