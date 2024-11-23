import { IProperty } from './property.interface';

export interface IDeveloper {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  properties?: IProperty[];
}
