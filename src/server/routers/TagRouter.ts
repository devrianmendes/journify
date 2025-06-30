import {
  DeleteTagSchema,
  NewTagSchema,
  OwnTagSchema,
} from "@/validators/tagValidator";
import { publicProcedure, router } from "../trpc";
import { db } from "@/lib/drizzle/drizzle.config";
import { tags } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { isAuthed } from "../proceduresMiddleware";

const protectedProcedure = publicProcedure.use(isAuthed);

export const TagRouter = router({
  createTag: protectedProcedure
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

        return {
          success: true,
          data: response,
        };
      } catch (error: any) {
        if (error?.cause?.code === "23505" || error?.code === "23505") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Já existe uma categoria com esse nome.",
          });
        }

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao registrar tag.",
        });
      }
    }),
  createdTags: protectedProcedure
    .input(OwnTagSchema)
    .query(async ({ input, ctx }) => {
      try {
        const response = await db
          .select()
          .from(tags)
          .where(eq(tags.creator_id, input.creator_id));

        if (response.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Sem tags criadas",
          });
        }
        return {
          status: true,
          data: response,
        };
      } catch (error: unknown) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao buscar categorias.",
        });
      }
    }),
  deleteTags: protectedProcedure
    .input(DeleteTagSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const creator_id = ctx.user.id;
        const response = await db.delete(tags).where(
          and(
            eq(tags.id, input.id), 
            eq(tags.creator_id, creator_id)
          )
        );
      } catch (error: any) {

      }
    }),
});
