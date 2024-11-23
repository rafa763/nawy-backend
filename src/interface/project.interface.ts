import { IProperty } from './property.interface';

export interface IProject {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  properties?: IProperty[];
}
