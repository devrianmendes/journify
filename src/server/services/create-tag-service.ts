import { AlreadyExist } from "@/errors/already-exist-error";
import { NewTagType } from "@/validators/tagValidator";
import * as tagRepository from "@/server/repositories/tag-repository";

export default async function createTagService(input: NewTagType) {
  try {
    const tag = await tagRepository.createTag(input);

    return {
      success: true,
      data: tag,
    };
  } catch (error: any) {
    if (error?.cause?.code === "23505" || error?.code === "23505") {
      throw new AlreadyExist("Já existe uma categoria com esse nome.");
    }
    throw new Error("Erro ao registrar tag.");
  }
}
