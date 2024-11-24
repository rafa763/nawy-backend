import { IProperty } from './property.interface';

export interface IProject {
  id: string | null;
  name: string;
  properties?: IProperty[];
}
