import { TemplateEntity } from 'src/domain/entities/template/template.entity'
import { kindKeys } from 'src/domain/kindKeys'
import { z } from 'zod'

const TemplateEntitySchema = z.object({
  kind: z.literal(kindKeys.template),
  id: z.string().uuid(),
  title: z.string().max(100),
  questions: z.array(z.string()),
})

export const validateTemplateEntity = (
  maybeTemplateEntity: TemplateEntity,
): maybeTemplateEntity is TemplateEntity => {
  const result = TemplateEntitySchema.safeParse(maybeTemplateEntity)
  return result.success
}
