export interface IStock {
  id: string | undefined,
  name: string,
  description: string,
  quantity: number,
  price: number,
  image: string,
  ratings: number,
  reviewers: number,
  logo: string,
  group: string,
  carts_quantity: number
};