export interface Root {
  status: string;
  data: Daum[];
}

export interface Daum {
  id: number;
  name: string;
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
