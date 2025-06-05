import { router } from '../trpc';
import { AuthRouter } from './AuthRouter';
import { CategoryRouter } from './CategoryRoute';

export const appRouter = router({
  auth: AuthRouter,
  category: CategoryRouter
});

export type AppRouter = typeof appRouter;
