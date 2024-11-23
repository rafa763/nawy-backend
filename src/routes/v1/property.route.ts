import { Router } from 'express';
import { PropertyController } from '../../controller/property.controller';
import { validateProperty } from '../../middleware/inputValidation';

const router = Router();
const propertyController = new PropertyController();

router.get('/search', propertyController.searchProperties);
router.get('/:id', propertyController.getProperty);
router.get('/', propertyController.getProperties);
router.post('/', validateProperty, propertyController.createProperty);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

export default router;
