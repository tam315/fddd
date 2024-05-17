import { err, ok, Result } from 'neverthrow'
import { TemplateEntity } from 'src/domain/entities/template/template.entity'
import { validateTemplateEntity } from 'src/domain/entities/template/template.invariants'
import { kindKeys } from 'src/domain/kindKeys'
import { v4 as uuidv4 } from 'uuid'

export class CreateNewTemplateError extends Error {
  // これがないとTSがエラーを区別することができない
  type = 'CreateNewTemplateError' as const
  failCause: 'validation_error' | 'unknown_error'
  constructor(failCause: 'validation_error' | 'unknown_error') {
    super()
    this.failCause = failCause
  }
}

type Args = {
  title: string
  questions?: string[]
}

export const createNew = (
  args: Args,
): Result<TemplateEntity, CreateNewTemplateError> => {
  const createdTemplate = {
    kind: kindKeys.template,
    id: uuidv4(),
    title: args.title,
    questions: args.questions ?? [],
  }
  if (!validateTemplateEntity(createdTemplate)) {
    return err(new CreateNewTemplateError('validation_error'))
  }
  return ok(createdTemplate)
}
