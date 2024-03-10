export interface OrderData {
  customer_first_name: string;
  customer_last_name: string;
  customer_email: string;
  customer_phone: string;
  customer_city: string;
  customer_postcode: string;
  customer_address: string;
  order_total: number;
  order_items: Array<{
    product_id: number;
    qty: number;
    item_price: number;
    item_total: number;
    order_id: number;
  }>;
}
