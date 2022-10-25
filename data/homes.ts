export type Home = {
  id: string;
  address: string;
  members: HomeHomeowner[];
};

type HomeHomeowner = {
  id: string;
  name: string;
};

export const HOMES: Home[] = [
  {
    id: "1",
    address: "Gormsvej 10",
    members: [
      {
        id: "1",
        name: "Mark Jan Bonne Kordon",
      },
      {
        id: "2",
        name: "Sara Bonne Kordon",
      },
    ],
  },
  {
    id: "2",
    address: "Gormsvej 8",
    members: [],
  },
  {
    id: "3",
    address: "Gormsvej 12",
    members: [],
  },
];
