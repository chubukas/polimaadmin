import {
  faBoxOpen,
  faCogs,
  faSignOutAlt,
  faShoppingBasket,
  faUsers,
  faBox,
  // faUserShield,
  faUserAlt,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

export const sideBarIcons = [
  {
    link: "/Dashboard",
    name: "Dashboard",
    icons: faBoxOpen,
  },
  {
    link: "/Locations",
    name: "Locations",
    icons: faBox,
  },
  {
    link: "/Parties",
    name: "Parties",
    icons: faShoppingBasket,
  },
  {
    link: "/Positions",
    name: "Positions",
    icons: faUserAlt,
  },
  {
    link: "/Politicians",
    name: "Politicians",
    icons: faUsers,
  },
  {
    link: "/Promises",
    name: "Promises",
    icons: faAddressCard,
  },
  // {
  //   link: "/Admins",
  //   name: "Admins",
  //   icons: faUserShield,
  // },
];

export const downIcons = [
  {
    link: "/Settings",
    name: "Settings",
    icons: faCogs,
  },
  {
    link: "#",
    name: "Logout",
    icons: faSignOutAlt,
  },
];
