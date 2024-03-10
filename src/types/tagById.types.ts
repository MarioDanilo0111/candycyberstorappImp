export interface RootTagById {
  status: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  slug: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  on_sale: boolean;
  images: Images;
  stock_status: string;
  stock_quantity?: number;
}

export interface Images {
  thumbnail: string;
  large: string;
}
