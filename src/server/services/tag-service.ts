import { AlreadyExist } from "@/errors/already-exist-error";
import {
  DeleteTagType,
  NewTagType,
  OwnTagType,
} from "@/validators/tagValidator";
import * as tagRepository from "@/server/repositories/tag-repository";
import { NotFoundError } from "@/errors/not-found-error";

export async function createTagService(input: NewTagType) {
  try {
    const tag = await tagRepository.createTag(input);

    return {
      success: true,
      message: "Tag " + tag + " criada",
      data: tag,
    };
  } catch (error: any) {
    if (error?.cause?.code === "23505" || error?.code === "23505") {
      throw new AlreadyExist("Já existe uma tag com esse nome.");
    }
    throw new Error("Erro ao registrar tag.");
  }
}

export async function createdTagService(input: OwnTagType) {
  try {
    const tag = await tagRepository.createdTag(input);

    if (!tag || tag.length < 1) {
      throw new NotFoundError("Nenhuma tag foi encontrada.");
    }
    return {
      success: true,
      message: "Tags " + tag + " carregadas",
      data: tag,

    };
  } catch (error: any) {
    throw new Error("Erro ao carregar tags.");
  }
}

export async function deleteTagService(
  creator_id: string,
  input: DeleteTagType
) {
  try {
    const tag = await tagRepository.deleteTag(creator_id, input);

    if (!tag || tag.length < 1) {
      throw new Error("Tag já foi deletada ou não existe.");
    }

    return {
      success: true,
      message: "Tag " + tag + " deletada",
      data: tag,
    };
  } catch (error: any) {
    throw new Error("Erro ao deletar tags.");
  }
}
