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
  is_public: z.boolean().default(true)
});
