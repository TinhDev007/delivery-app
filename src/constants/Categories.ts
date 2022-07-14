import { ICategory } from "../types/CategoryTypes";
import ClothingImg from "../assets/images/merchants/clothing.jpg";
import ComicImg from "../assets/images/merchants/comic.jpg";
import ComputerImg from "../assets/images/merchants/computer.jpg";
import ElectronicsImg from "../assets/images/merchants/electronics.jpg";
import FoodImg from "../assets/images/merchants/food.jpg";
import FruitImg from "../assets/images/merchants/fruit.jpg";
import HardwareImg from "../assets/images/merchants/hardware.jpg";
import MusicImg from "../assets/images/merchants/music.jpg";
import PoolImg from "../assets/images/merchants/pool.jpg";

export const Categories: ICategory[] = [
  {
    id: '1',
    name: 'clothing',
    image: ClothingImg,
  },
  {
    id: '2',
    name: 'comic',
    image: ComicImg,
  },
  {
    id: '3',
    name: 'computer',
    image: ComputerImg,
  },
  {
    id: '4',
    name: 'electornics',
    image: ElectronicsImg,
  },
  {
    id: '5',
    name: 'food',
    image: FoodImg,
  },
  {
    id: '6',
    name: 'fruit',
    image: FruitImg,
  },
  {
    id: '7',
    name: 'hardware',
    image: HardwareImg,
  },
  {
    id: '8',
    name: 'music',
    image: MusicImg,
  },
  {
    id: '9',
    name: 'pool',
    image: PoolImg,
  }
];