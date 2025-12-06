import { v4 as uuidv4 } from 'uuid';

const cardArray = [
  {
    name: 'fries',
    img: '/games/mini-games/MemoryGame/data/fries.png',
  },
  {
    name: 'cheeseburger',
    img: '/games/mini-games/MemoryGame/data/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: '/games/mini-games/MemoryGame/data/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: '/games/mini-games/MemoryGame/data/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: '/games/mini-games/MemoryGame/data/milkshake.png',
  },
  {
    name: 'pizza',
    img: '/games/mini-games/MemoryGame/data/pizza.png',
  },
  {
    name: 'fries',
    img: '/games/mini-games/MemoryGame/data/fries.png',
  },
  {
    name: 'cheeseburger',
    img: '/games/mini-games/MemoryGame/data/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: '/games/mini-games/MemoryGame/data/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: '/games/mini-games/MemoryGame/data/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: '/games/mini-games/MemoryGame/data/milkshake.png',
  },
  {
    name: 'pizza',
    img: '/games/mini-games/MemoryGame/data/pizza.png',
  },
];
const cardArrayWithIds = cardArray.map((item) => {
  return {
    id: uuidv4(),
    ...item,
  };
});
export const RANDOM_ARRAY = cardArrayWithIds.sort(() => 0.5 - Math.random());
