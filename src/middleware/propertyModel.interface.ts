import { PaginatedResponse } from '../interface/paginatedResponse.interface';
import { IProperty } from '../interface/property.interface';
import { IPropertySummary } from '../interface/propertySummary.interface';

export interface IPropertyModel {
  getAll(
    page?: number,
    size?: number,
  ): Promise<PaginatedResponse<IPropertySummary>>;

  get(id: string): Promise<IProperty | null>;

  save(property: any): Promise<IProperty>;

  searchProperties(query: string): Promise<IPropertySummary[]>;
}
export { IProperty };
