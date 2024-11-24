import { Router } from 'express';
import { PropertyController } from '../../controller/property.controller';
import { validateProperty } from '../../middleware/inputValidation';
import upload from '../../middleware/upload';

const router = Router();
const propertyController = new PropertyController();

router.get('/search', propertyController.searchProperties);
router.get('/:id', propertyController.getProperty);
router.get('/', propertyController.getProperties);
router.post(
  '/',
  validateProperty,
  upload.single('image'),
  propertyController.createProperty,
);

export default router;
