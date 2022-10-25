export type Homeowner = {
  id: string;
  fullName: string;
  firstName: string;
  home: {
    id: string;
    address: string;
  } | null;
};

export const HOMEOWNERS: Homeowner[] = [
  {
    id: "1",
    fullName: "Mark Jan Bonne Kordon",
    firstName: "Mark",
    home: {
      id: "1",
      address: "Gormsvej 10",
    },
  },
  {
    id: "2",
    fullName: "Sara Bonne Kordon",
    firstName: "Sara",
    home: {
      id: "1",
      address: "Gormsvej 10",
    },
  },
  {
    id: "3",
    fullName: "Mads Cortz Jørgensen",
    firstName: "Mads",
    home: null,
  },
  {
    id: "4",
    fullName: "Maria Michelle Cortz Jørgensen",
    firstName: "Maria",
    home: null,
  },
];
