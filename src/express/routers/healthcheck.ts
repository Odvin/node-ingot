import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger';
import { serviceInfo, liveness, readiness } from '../controllers';

const maintenance = Router();

maintenance.get('/healthcheck/liveness', liveness);
maintenance.get('/healthcheck/readiness', readiness);

maintenance.use('/open-api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

maintenance.use('/', serviceInfo);

export { maintenance };
