import { Router } from 'express';
import errorHandler from '@core/application/middlewares/errorHandlerMiddlewares';
import formatHandler from '@core/application/middlewares/formatDataMiddleware';
import coreRoutes from '@core/application/routes';
import apiRoute from '@api/application/routes'


const router = Router();

router.use('/', apiRoute);
router.use('/core', coreRoutes);
router.use(formatHandler);
router.use(errorHandler);

export default router;
