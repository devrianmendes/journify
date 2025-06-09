import {
  CategorySchema,
  CreateCategorySchema,
  DeleteCategorySchema,
  OwnCategorySchema,
} from "@/validators/categoryValidator";
import { publicProcedure, router } from "../trpc";
import { categories } from "@/db/schema";
import { get } from "http";
import { TRPCError } from "@trpc/server";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";

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

          console.log(data, 'data')
          console.log(error, 'error')

        if (error && error.details.includes("already exists")) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Categoria já existe.",
          });
        }

        const createdCategory = await db.insert(categories).values({
          name: input.name,
          slug: input.slug,
          color: input.color,
          creator_id: input.creator_id,
          is_public: input.is_public,
        });

        console.log(createdCategory, "criando já existente");

        return { data, error: null };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao criar categoria. Tente novamente.",
        });
      }
    }),
  getOwnCreatedGategories: publicProcedure
    .input(OwnCategorySchema)
    .query(async ({ input }) => {
      try {
        const ownCategories = await db
          .select()
          .from(categories)
          .where(eq(categories.creator_id, input.user_id));

        if (!ownCategories || ownCategories.length <= 0) {
          return {
            data: ownCategories,
            error: null,
          };
        }

        return {
          data: ownCategories,
          error: null,
        };
      } catch (error: unknown) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao buscar categorias.",
        });
      }
    }),
  deleteCategory: publicProcedure
    .input(DeleteCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const selectecCategory = await db.query.categories.findFirst({
          where: eq(categories.id, input.category_id),
        });

        if (!selectecCategory) {
          console.log(selectecCategory, "selectecCategory falso");
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Erro ao deletar categoria.",
          });
        }

        if (selectecCategory.creator_id !== input.user_id) {
          console.log(selectecCategory, "diferente do usuario");
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Erro ao deletar categoria.",
          });
        }

        const deleteSelectedCategory = await db
          .delete(categories)
          .where(eq(categories.id, input.category_id));

        return {
          data: deleteSelectedCategory,
          error: null,
        };
      } catch (error: unknown) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro interno do servidor. Tente novamente mais tarde.",
        });
      }
    }),
});
