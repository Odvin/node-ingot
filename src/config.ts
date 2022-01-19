export const environment = process.env.NODE_ENV || 'development';
export const serviceName = process.env.SERVICE_NAME || 'Athletes-Server';
export const port = parseInt(process.env.API_PORT || '4000');
export const corsUrl = process.env.CORS_URL || '*';

export const consoleLog = {
  format: process.env.CONSOLE_LOG_FORMAT || 'plain',
  level: process.env.CONSOLE_LOG_LEVEL || 'info',
};

export const routerLog = {
  active: Boolean(process.env.ROUTER_LOG_ACTIVATION || false),
  format: process.env.ROUTER_LOG_FORMAT || 'tiny',
};

export const parserOptions = {
  json: { limit: '10mb' },
  urlencoded: {
    limit: '10mb',
    extended: true,
    parameterLimit: 50000,
  },
};

export const adminCredentials = {
  name: process.env.ADMIN_NAME || 'Dmytro',
  surname: process.env.ADMIN_SURNAME || 'Ovchynnykov',
  id: process.env.ADMIN_ID || '507f191e810c19729de860ea',
  email: process.env.ADMIN_EMAIL || 'admin@athletes.com',
  password: process.env.ADMIN_PASSWORD || 'strongPassword!',
};

export const mongoUrl =
  process.env.MONGO_URL ||
  'mongodb://itRDevUser:topSecret53!@mongo01:27017,mongo02:27017,mongo03:27017/nsca-athletes?authSource=admin&replicaSet=mongo-cluster&w=majority';

export const testMongoUrl =
  process.env.TEST_MONGO_URL ||
  'mongodb://itRDevUser:topSecret53!@localhost:27017';

export const mongoDb = process.env.MONGO_DB_NAME || 'nsca-athletes';

export const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const postgresOptions = {
  user: process.env.POSTGRES_USER || 'itRDevUser',
  host: process.env.POSTGRES_HOST || 'athletes-postgres',
  database: process.env.POSTGRES_DB || 'athletes-db',
  password: process.env.POSTGRES_PASSWORD || 'topSecret53!',
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
  connectionTimeoutMillis: process.env.POSTGRES_CONNECTION_TIMEOUT
    ? parseInt(process.env.POSTGRES_CONNECTION_TIMEOUT, 10)
    : 2000,
  idleTimeoutMillis: process.env.POSTGRES_IDLE_TIMEOUT
    ? parseInt(process.env.POSTGRES_IDLE_TIMEOUT, 10)
    : 3000,
  max: process.env.POSTGRES_POOL_SIZE
    ? parseInt(process.env.POSTGRES_POOL_SIZE, 10)
    : 10,
};

export const elasticOptions = {
  node: process.env.ELASTIC_NODE || 'http://es01:9200',
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'SomeSecret!',
  expiresIn: process.env.JWT_EXPIRES || '3h',
};

export const ncsaApiUrl =
  process.env.NCSA_API_URL ||
  'http://data-staging.ncsasports.org/api/coachlive-be';
