import { router } from "../trpc";
import { AuthRouter } from "./AuthRouter";
import { CategoryRouter } from "./CategoryRoute";
import { TagRouter } from "./TagRouter";

export const appRouter = router({
  auth: AuthRouter,
  category: CategoryRouter,
  tag: TagRouter,
});

export type AppRouter = typeof appRouter;
