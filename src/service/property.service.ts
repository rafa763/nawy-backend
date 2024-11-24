import NotFoundError from '../error/notFound.error';
import ValidationError from '../error/validation.error';
import {
  IProperty,
  IPropertyModel,
} from '../middleware/propertyModel.interface';
import { IPropertyService } from '../interface/propertyService.interface';
import { Property } from '../model/property.model';
import { AIValidator } from '../utils/ai';
import { uploadFile } from '../utils/s3';

export class PropertyService implements IPropertyService {
  private propertyModel: IPropertyModel;

  constructor() {
    this.propertyModel = new Property();
  }

  async getProperty(id: string) {
    const data = await this.propertyModel.get(id);
    if (!data) {
      throw new NotFoundError('Property not found');
    }
    return data;
  }

  async getProperties(page: number, size: number) {
    const data = await this.propertyModel.getAll(page, size);
    return data;
  }

  async searchProperties(query: string) {
    const data = await this.propertyModel.searchProperties(query);
    return data;
  }

  async createProperty(property: IProperty, image: Buffer) {
    const valid = await new AIValidator().verifyUserInput(property);
    if (!valid) {
      throw new ValidationError('Invalid input (Offensive language or spam)');
    }
    property.imageUrl = await uploadFile(image);
    const ans = await this.propertyModel.save(property);
    return ans;
  }
}
