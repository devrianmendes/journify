import {
  DeleteTagSchema,
  NewTagSchema,
  OwnTagSchema,
} from "@/validators/tagValidator";
import { publicProcedure, router } from "../trpc";
import { db } from "@/lib/drizzle/drizzle.config";
import { tags } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { isAuthed } from "../proceduresMiddleware";
import {
  createdTagService,
  createTagService,
  deleteTagService,
} from "@/server/services/tag-service";
import forceLogout from "@/hooks/use-logout";
import { handleServiceError } from "@/errors/handle-service-errors";

const protectedProcedure = publicProcedure.use(isAuthed);

export const TagRouter = router({
  createTag: protectedProcedure
    .input(NewTagSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (!ctx.user) {
          forceLogout();
        }

        const createTag = await createTagService(input);
        return createTag;
      } catch (error: any) {
        handleServiceError(error);
      }
    }),
  createdTags: protectedProcedure
    .input(OwnTagSchema)
    .query(async ({ input, ctx }) => {
      try {
        if (!ctx.user) {
          forceLogout();
        }

        const createdTag = await createdTagService(input);

        return createdTag;
      } catch (error: unknown) {
        handleServiceError(error);
      }
    }),
  deleteTags: protectedProcedure
    .input(DeleteTagSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (!ctx.user) {
          forceLogout();
        }

        const creator_id = ctx.user.id;
        const deletedTag = await deleteTagService(creator_id, input);

        return deletedTag;
      } catch (error: any) {
        handleServiceError(error);
      }
    }),
});
