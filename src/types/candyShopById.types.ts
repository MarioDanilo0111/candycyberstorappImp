export interface RootId {
  status: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  description: string;
  price: number;
  on_sale: boolean;
  images: Images;
  stock_status: string;
  stock_quantity: number;
  tags: Tag[];
}

export interface Images {
  thumbnail: string;
  large: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}
