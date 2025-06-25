import { z } from "zod";

export const NewTagSchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
  slug: z.string().min(1, "Preencha o slug"),
  color: z.string().min(1, "Escolha a cor"),
  creator_id: z.string().min(1, "Preencha o ID do criador"),
});

export const TagSchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
  color: z.string().min(1, "Escolha a cor"),
});


export type NewTagType = z.infer<typeof NewTagSchema>;
export type TagType = z.infer<typeof TagSchema>;
