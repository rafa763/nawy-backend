import { IProperty } from './property.interface';

export interface IPropertyModel {
  getAll(page?: number, size?: number): Promise<IProperty[]>;

  get(id: string): Promise<IProperty | null>;

  save(property: any): Promise<IProperty>;

  update(id: string, property: any): Promise<IProperty>;

  delete(id: string): Promise<IProperty>;

  searchProperties(query: string): Promise<IProperty[]>;
}
export { IProperty };
