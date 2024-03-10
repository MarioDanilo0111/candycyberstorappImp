export interface RootResponseDeliveryType {
  status: string;
  data: Data;
}

export interface Data {
  id: number;
  user_id: number;
  order_date: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone: string;
  order_total: number;
  created_at: string;
  updated_at: string;
  items: Item[];
}

export interface Item {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}
