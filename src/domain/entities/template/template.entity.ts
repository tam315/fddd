import { UserEntity } from 'src/domain/entities/user/user.entity'
import { kindKeys } from 'src/domain/kindKeys'

export type TemplateEntity = {
  kind: typeof kindKeys.template
  id: string
  title: string
  questions: string[]
  author?: UserEntity
}
