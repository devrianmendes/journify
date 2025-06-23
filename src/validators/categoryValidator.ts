import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
  color: z.string().min(1, "Escolha a cor"),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
  slug: z.string().min(1, "Preencha o slug"),
  color: z.string().min(1, "Escolha a cor"),
  creator_id: z.string().min(1, "Preencha o ID do criador"),
  is_public: z.boolean().default(true),
});

export const StoredCategorySchema = CreateCategorySchema.extend({
  id: z.string(),
  created_at: z.date()
})

export const OwnCategorySchema = z.object({
  user_id: z.string().min(1),
});

export const FilteredCategorySchema = z.object({
  name: z.string(),
});

export const DeleteCategorySchema = z.object({
  user_id: z.string().min(1, 'Erro ao encontrar usuário.'),
  category_id: z.string().min(1, 'Selecione uma categoria.'),
});

export type CategoryType = z.infer<typeof CategorySchema>;
export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;
export type StoredCategoryType = z.infer<typeof StoredCategorySchema>;
export type OwnCategoryType = z.infer<typeof OwnCategorySchema>;
export type FilteredCategoryType = z.infer<typeof FilteredCategorySchema>;
export type DeleteCategoryType = z.infer<typeof DeleteCategorySchema>;
