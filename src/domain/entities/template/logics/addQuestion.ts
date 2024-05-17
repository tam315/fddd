import { ok, Result } from 'neverthrow'
import { TemplateEntity } from 'src/domain/entities/template/template.entity'
import { EntityLogicFailable } from 'src/domain/types'

export class AddQuestionError extends Error {
  type = 'AddQuestionError' as const
}

export const addQuestion = ((
  template: TemplateEntity,
  appendingQuestion: string,
): Result<TemplateEntity, AddQuestionError> => {
  return ok({
    ...template,
    questions: [...template.questions, appendingQuestion],
  })
}) satisfies EntityLogicFailable<TemplateEntity>
