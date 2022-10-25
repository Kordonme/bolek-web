export type HomePost = {
  id: string;
  homeId: string;
  date: number;
  name: string;
  message: string;
  likes: number;
  replies?: HomePost[];
};

export const HOME_POSTS: HomePost[] = [
  {
    id: "1",
    homeId: "1",
    date: new Date().getTime(),
    name: "Mark Jan Bonne Kordon",
    message: "Jeg har været ovre med blomster til dem.",
    likes: 1,
    replies: [
      {
        id: "1",
        homeId: "1",
        message: "Sådan!",
        likes: 0,
        name: "Mads Cortz Jørgensen",
        date: new Date().getTime(),
      },
    ],
  },
  {
    id: "2",
    homeId: "1",
    date: new Date().getTime(),
    name: "Jesper Justesen",
    message:
      "Jeg har været over og gøre opmærksom på at græsset skal slås af dem selv.",
    likes: 2,
    replies: [],
  },
];
