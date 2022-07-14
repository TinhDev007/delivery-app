import { IMerchant } from "../types/MerchantTypes";
import ClothingImg from "../assets/images/merchants/clothing.jpg";
import ComicImg from "../assets/images/merchants/comic.jpg";
import ComputerImg from "../assets/images/merchants/computer.jpg";
import ElectronicsImg from "../assets/images/merchants/electronics.jpg";
import FoodImg from "../assets/images/merchants/food.jpg";
import FruitImg from "../assets/images/merchants/fruit.jpg";
import HardwareImg from "../assets/images/merchants/hardware.jpg";
import MusicImg from "../assets/images/merchants/music.jpg";
import PoolImg from "../assets/images/merchants/pool.jpg";
import { IStock } from "../types/StockTypes";
import LogoImg1 from "../assets/images/logos/logo1.png";
import LogoImg2 from "../assets/images/logos/logo2.png";
import ProductImg from "../assets/images/merchants/product.png";

export const Stocks: IStock[] = [
  {
    id: "1",
    description: "This is the description for this product",
    name: "Coca Cola",
    quantity: 12,
    price: 120,
    image: ProductImg,
    ratings: 4.6,
    reviewers: 455,
    logo: LogoImg1,
    group: "1",
    carts_quantity: 0
  },
  {
    id: "2",
    description: "This is the description for this product",    
    name: "Comic Books",
    quantity: 130,
    price: 12,    
    image: ComicImg,
    ratings: 5,
    reviewers: 200,
    logo: LogoImg2,
    group: "1",
    carts_quantity: 0
  },
  {
    id: "3",
    description: "This is the description for this product",    
    name: "Computer",
    quantity: 200,
    price: 23,
    image: ComputerImg,
    ratings: 4.3,
    reviewers: 300,
    logo: LogoImg1,
    group: "2",
    carts_quantity: 0
  },  
  {
    id: "4",
    description: "This is the description for this product",    
    name: "Food Service",
    quantity: 123,
    price: 90,
    image: FoodImg,
    ratings: 4.2,
    reviewers: 20,
    logo: LogoImg2,
    group: "1",
    carts_quantity: 0
  },
  {
    id: "5",
    description: "This is the description for this product",    
    name: "Electornics Equipment",
    quantity: 43,
    price: 90,
    image: ElectronicsImg,
    ratings: 4.6,
    reviewers: 900,
    logo: LogoImg1,
    group: "2",
    carts_quantity: 0
  },
  {
    id: "6",
    description: "This is the description for this product",    
    name: "Fruit product",
    quantity: 130,
    price: 23,    
    image: FruitImg,
    ratings: 4.3,
    reviewers: 210,
    logo: LogoImg2,
    group: "1",
    carts_quantity: 0
  },
  {
    id: "7",
    description: "This is the description for this product",    
    name: "Hardware product",
    quantity: 71,
    price: 91,
    image: HardwareImg,
    ratings: 4.2,
    reviewers: 90,
    logo: LogoImg1,
    group: "2",
    carts_quantity: 0
  },
  {
    id: "8",
    description: "This is the description for this product",    
    name: "Music Equipment",
    quantity: 45,
    price: 12,
    image: MusicImg,
    ratings: 4.6,
    reviewers: 390,
    logo: LogoImg2,
    group: "2",
    carts_quantity: 0
  },
  {
    id: "9",
    description: "This is the description for this product",    
    name: "Pool product",
    quantity: 12,
    price: 87,
    image: PoolImg,
    ratings: 4.1,
    reviewers: 10,
    logo: LogoImg2,
    group: "1",
    carts_quantity: 0
  },
];