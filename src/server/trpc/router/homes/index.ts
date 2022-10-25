import { router } from "../../trpc";
import { getHome } from "./get-home";
import { listHomes } from "./list-homes";

export const homeRouter = router({
  listHomes,
  getHome,
});
