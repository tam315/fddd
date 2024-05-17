import { kindKeys } from 'src/domain/kindKeys'

export type UserEntity = {
  kind: typeof kindKeys.user
  id: string
  name: string
  age: number
  email: string
}
