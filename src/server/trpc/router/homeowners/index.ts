import { router } from "../../trpc";
import { addHomeowner } from "./add-homeowner";
import { listHomeowners } from "./list-homeowners";

export const homeownerRouter = router({
  listHomeowners,
  addHomeowner,
});
