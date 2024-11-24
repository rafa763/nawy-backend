export interface IProperty {
  id?: string;
  name: string;
  description: string | null;
  price: number;
  rooms: number;
  size: number;
  floor: number | null;
  imageUrl: string | null;
  addressId?: string | null;
  developerId?: string | null;
  projectId?: string | null;
  address?: any;
  developer?: any;
  project?: any;
}
