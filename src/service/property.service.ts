import NotFoundError from '../error/notFound.error';
import ValidationError from '../error/validation.error';
import { IPropertyModel } from '../interface/propertyModel.interface';
import { Property } from '../model/property.model';
import { AIValidator } from '../utils/ai';

export class PropertyService {
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

  async createProperty(property: any) {
    const valid = await new AIValidator().verifyUserInput(property);
    if (!valid) {
      throw new ValidationError('Invalid input (Offensive language or spam)');
    }
    const ans = await this.propertyModel.save(property);
    return ans;
  }

  async updateProperty(id: string, property: any) {
    const ans = await this.propertyModel.update(id, property);
    return ans;
  }

  async deleteProperty(id: string) {
    const ans = await this.propertyModel.delete(id);
    return ans;
  }
}
