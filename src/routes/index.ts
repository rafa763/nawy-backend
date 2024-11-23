import { Router } from 'express';
import propertyRoutes from './v1/index';

const router = Router();

router.use('/v1', propertyRoutes);

export default router;
