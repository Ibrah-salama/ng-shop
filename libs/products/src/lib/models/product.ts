import { Category } from "@blubits/products";

export class Product {
  id?: string;
  name?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  price?: number;
  category?: Category;
  countInStock?: number;
  rating?: number;
  isFeatured?: boolean;
  dateCreated?: string;
}
