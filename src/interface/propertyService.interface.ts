import { PaginatedResponse } from './paginatedResponse.interface';
import { IProperty } from './property.interface';
import { IPropertySummary } from './propertySummary.interface';

export interface IPropertyService {
  getProperty(id: string): Promise<IProperty | null>;
  getProperties(
    page: number,
    size: number,
  ): Promise<PaginatedResponse<IPropertySummary>>;
  searchProperties(query: string): Promise<IPropertySummary[]>;
  createProperty(
    property: Partial<IProperty>,
    image: Buffer,
  ): Promise<IProperty>;
}
