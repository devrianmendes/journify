import {
  CategorySchema,
  CreateCategorySchema,
} from "@/validators/categoryValidator";
import { publicProcedure, router } from "../trpc";
import { categories } from "@/db/schema";
import { get } from "http";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/drizzle/drizzle.config";

export const CategoryRouter = router({
  getCreatedCategories: publicProcedure
    // .input(CategorySchema)
    .query(async ({ ctx }) => {
      try {
        const { data, error } = await ctx.supabase.from("categories").select();

        if (error || !data) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Erro ao buscar categorias.",
          });
        }

        return { data, error: null };
      } catch (error: unknown) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao buscar categorias.",
        });
      }
    }),
  createCategory: publicProcedure
    .input(CreateCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { data, error } = await ctx.supabase
          .from("categories")
          .insert(input);

        if (error || !data) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Erro ao criar categoria.",
          });
        }

        const createdCategory = await db.insert(categories).values({
          name: input.name,
          slug: input.slug,
          color: input.color,
          creator_id: input.creator_id,
          is_public: input.is_public,
        });

        return { data, error: null };
      } catch (error: unknown) {
        console.log(error);
      }
    }),
});
