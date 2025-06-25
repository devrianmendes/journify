import {
  CreateCategorySchema,
  DeleteCategorySchema,
  FilteredCategorySchema,
  OwnCategorySchema,
} from "@/validators/categoryValidator";
import { publicProcedure, router } from "../trpc";
import { categories } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { db } from "@/db/index";
import { arrayOverlaps, eq, ilike } from "drizzle-orm";
import { isAuthed } from "../proceduresMiddleware";

const protectedProcedure = publicProcedure.use(isAuthed);

export const CategoryRouter = router({
  getCreatedCategories: protectedProcedure
    // .input(CreateCategorySchema)
    .query(async ({ ctx }) => {
      try {
        const data = await db
          .select()
          .from(categories)
          .where(eq(categories.is_public, true));

        if (data.length === 0) {
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
  createCategory: protectedProcedure
    .input(CreateCategorySchema)
    .mutation(async ({ input }) => {
      try {
        const createdCategory = await db
          .insert(categories)
          .values({
            name: input.name,
            slug: input.slug,
            color: input.color,
            creator_id: input.creator_id,
            is_public: input.is_public,
          })
          .returning({
            name: categories.name,
          });

        if (createdCategory.length <= 0) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Erro ao criar categoria.",
          });
        }

        return { data: createdCategory, error: null };
      } catch (error: any) {
        // console.log(error);
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
          message: "Erro ao criar categoria. Tente novamente.",
        });
      }
    }),
  getOwnCreatedCategories: protectedProcedure
    .input(OwnCategorySchema)
    .query(async ({ input }) => {
      try {
        const ownCategories = await db
          .select()
          .from(categories)
          .where(eq(categories.creator_id, input.user_id));

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
  getFilteredCategories: protectedProcedure
    .input(FilteredCategorySchema)
    .query(async ({ input }) => {
      try {
        const filter = input.name ? `%${input.name}%` : "";
        const categoryFiltered = await db
          .select()
          .from(categories)
          .where(ilike(categories.name, filter));

        return {
          data: categoryFiltered,
          error: null,
        };
      } catch (error: unknown) {
        return {
          data: null,
          error: error,
        };
      }
      // console.log(input.name, 'oaisjdoaijsdijadoijdoiajsdiojasoijdoiasjdiojaoidjoaisjdoiajsiodjaoisdj');
    }),
  deleteCategory: protectedProcedure
    .input(DeleteCategorySchema)
    .mutation(async ({ input }) => {
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
