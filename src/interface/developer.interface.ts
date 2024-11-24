import { IProperty } from './property.interface';

export interface IDeveloper {
  id: string;
  name: string;
  description: string | null;
  properties?: IProperty[];
}
