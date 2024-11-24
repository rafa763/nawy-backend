import { IProperty } from './property.interface';

export interface IAddress {
  id: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  properties?: IProperty[];
}
