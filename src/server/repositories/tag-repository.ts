import { tags } from "@/db/schema";
import { db } from "@/lib/drizzle/drizzle.config";
import {
  DeleteTagType,
  NewTagType,
  OwnTagType,
} from "@/validators/tagValidator";
import { and, eq } from "drizzle-orm";

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

export async function createdTag(input: OwnTagType) {
  const response = await db
    .select()
    .from(tags)
    .where(eq(tags.creator_id, input.creator_id));

  return response;
}

export async function deleteTag(creator_id: string, input: DeleteTagType) {
  const response = await db
    .delete(tags)
    .where(and(eq(tags.id, input.id), eq(tags.creator_id, creator_id)))
    .returning({ id: tags.id, name: tags.name });

  return response;
}
