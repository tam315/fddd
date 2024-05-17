import { UserEntity } from 'src/domain/entities/user/user.entity'
import { kindKeys } from 'src/domain/kindKeys'
import { z } from 'zod'

const UserEntitySchema = z.object({
  kind: z.literal(kindKeys.user),
  id: z.string().uuid(),
  name: z.string(),
  age: z.number(),
  email: z.string().email(),
})

export const validateUserEntity = (maybeUserEntity: UserEntity): boolean => {
  const result = UserEntitySchema.safeParse(maybeUserEntity)
  return result.success
}
