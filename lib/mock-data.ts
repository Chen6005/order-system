import type { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  {
    id: "classic-burger",
    name: "經典牛肉漢堡",
    description: "牛肉排搭配生菜、番茄、洋蔥與特製醬料。",
    price: 180,
    category: "pizza",
    available: true,
  },
  {
    id: "fried-chicken-rice",
    name: "炸雞飯",
    description: "酥脆炸雞搭配白飯與醃漬小菜。",
    price: 160,
    category: "pizza",
    available: true,
  },
  {
    id: "beef-noodle-soup",
    name: "紅燒牛肉麵",
    description: "紅燒牛肉、手工麵條、青菜與濃郁湯頭。",
    price: 190,
    category: "pasta",
    available: true,
  },
  {
    id: "grilled-salmon-bowl",
    name: "烤鮭魚飯碗",
    description: "烤鮭魚搭配米飯、時蔬與芝麻醬。",
    price: 240,
    category: "pizza",
    available: true,
  },
  {
    id: "mushroom-pasta",
    name: "奶油菇菇義大利麵",
    description: "奶油醬義大利麵搭配綜合菇與帕瑪森起司。",
    price: 170,
    category: "pasta",
    available: true,
  },
  {
    id: "lemon-iced-tea",
    name: "檸檬冰紅茶",
    description: "現泡紅茶加入檸檬與微甜風味。",
    price: 60,
    category: "drink",
    available: true,
  },
];
