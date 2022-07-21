export interface IStock {
  id: string | undefined,
  name: string,
  description: string,
  quantity: number,
  price: number,
  image: string,
  logo: string,
  prod_group: string,
  carts_quantity: number,
  logo_preview_url?: string,
  image_preview_url?: string
};