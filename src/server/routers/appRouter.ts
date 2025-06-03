import { router } from '../trpc';
import { AuthRouter } from './AuthRouter';

export const appRouter = router({
  auth: AuthRouter,
});

export type AppRouter = typeof appRouter;
