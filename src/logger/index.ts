import { createLogger, config } from 'winston';
import { serviceName } from '../config';

import { consoleTransport } from './transports';

const transports = [consoleTransport];

const logger = createLogger({
  defaultMeta: { service: serviceName },
  levels: config.syslog.levels,
  transports,
});

export default logger;
