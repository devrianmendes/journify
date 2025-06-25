import { NewTagSchema } from "@/validators/tagValidator";
import { publicProcedure, router } from "../trpc";
import { db } from "@/lib/drizzle/drizzle.config";
import { tags } from "@/db/schema";

export const TagRouter = router({
  createTag: publicProcedure
    .input(NewTagSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const response = await db
          .insert(tags)
          .values({
            name: input.name,
            slug: input.slug,
            color: input.color,
            creator_id: input.creator_id,
          })
          .returning({
            name: tags.name,
          });
        console.log(response, 'response');
      } catch (error) {
        console.log(error, "error")
      }
    }),
});
