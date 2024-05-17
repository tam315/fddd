import { TemplateEntity } from 'src/domain/entities/template/template.entity'
import { UserEntity } from 'src/domain/entities/user/user.entity'
import { EntityLogic } from 'src/domain/types'

export const setAuthor = ((
  template: TemplateEntity,
  author: UserEntity,
): TemplateEntity => {
  return {
    ...template,
    author,
  }
}) satisfies EntityLogic<TemplateEntity>
