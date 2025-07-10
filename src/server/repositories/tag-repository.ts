import { tags } from "@/db/schema";
import { db } from "@/lib/drizzle/drizzle.config";
import { NewTagType } from "@/validators/tagValidator";

export async function createTag(input: NewTagType) {
  const [response] = await db
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
  return response;
}
