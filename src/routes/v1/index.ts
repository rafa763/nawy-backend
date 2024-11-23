import { Router } from 'express';
import propertyRoutes from './property.route';

const router = Router();

router.use('/property', propertyRoutes);

export default router;
