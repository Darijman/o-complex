export interface Order {
  phone: string;
  cart: { id: number; quantity: number }[];
}
