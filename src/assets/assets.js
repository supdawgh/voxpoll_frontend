import logo from "./logo2.png";
import b1 from "./b1.png";
import cup from "./cup.png";
import b2 from "./b2.png";
import h1 from "./h1.png";
import d1 from "./d1.png";
import m1 from "./m1.png";
import m2 from "./m2.png";
import searchicon from "./search_icon.png";
import boy1 from "./boy1.png";
import boy2 from "./boy2.png";
import boy3 from "./boy3.png";
import girl1 from "./girl1.png";
import girl2 from "./girl2.png";
import vote from './vote.png';

export const assets = {
  logo,
  d1,
  b2,
  cup,
  h1,
  m1,
  m2,
  searchicon,
  vote
};

export const category_list = [
  {
    menu_name: "Singing Competition",
    menu_image: m1,
    param: "sing",
  },
  {
    menu_name: "Dance-Off",
    menu_image: d1,
    param: "dance",
  },
  {
    menu_name: "Beauty Pagent",
    menu_image: b1,
    param: "pageant",
  },
  {
    menu_name: "Art Attack",
    menu_image: h1,
    param: "art",
  },
];
export const name_list = [
  {
    _id: "1",
    name: "Sasu Food Contest",
    description: " Impress your future sasu by swad",
    image: d1,
  },
  {
    _id: "2",
    name: "Microphone Drop",
    description: "Maan ko bhawana pokhnus yaha ",
    image: b1,
  },
  {
    _id: "3",
    name: "Miss S.Marga 2081",
    description: " Ko ho Buddhanagar ko pari? ",
    image: b1,
  },
  {
    _id: "4",
    name: "Mic Drop",
    description: "Maan ko bhawana pokhnus yaha ",
    image: d1,
  },
  {
    _id: "5",
    name: "Mic Drop",
    description: "Maan ko bhawana pokhnus yaha ",
    image: b1,
  },
];

export const API_BASE_URl = "http://localhost:3500";
