import { IAddress } from './address.interface';
import { IDeveloper } from './developer.interface';
import { IProject } from './project.interface';

export interface IProperty {
  id: string;
  name: string;
  description: string | null;
  price: number;
  rooms: number;
  size: number;
  floor: number | null;
  addressId: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  developerId: string | null;
  projectId: string | null;
  address?: IAddress | null;
  developer?: IDeveloper | null;
  project?: IProject | null;
}
