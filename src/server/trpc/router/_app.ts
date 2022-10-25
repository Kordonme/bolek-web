import { router } from "../trpc";
import { homeownerRouter } from "./homeowners";
import { homeRouter } from "./homes";

export const appRouter = router({
  homeowner: homeownerRouter,
  home: homeRouter,
});

export type AppRouter = typeof appRouter;
