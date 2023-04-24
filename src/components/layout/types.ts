interface NavItem {
  label: string;
  link: string;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "MY EVENTS",
    link: "/user-events",
  },
  {
    label: "BROWSE",
    link: "/all-events",
  },
  {
    label: "USERS",
    link: "/all-users",
  },
];

export const ABOUT_ITEMS: Array<NavItem> = [
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Github - Frontend",
    link: "https://github.com/shailesh-shenoy/eventpawz-frontend",
  },
  {
    label: "Github - Backend",
    link: "https://github.com/shailesh-shenoy/eventpawz",
  },
];

export type { NavItem };
