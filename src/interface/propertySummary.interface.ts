export interface IPropertySummary {
  id: string;
  name: string;
  description: string | null;
  price: number;
  rooms: number;
  size: number;
  imageUrl: string | null;
}
