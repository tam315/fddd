import { err, ok, Result } from 'neverthrow'
import { UserEntity } from 'src/domain/entities/user/user.entity'
import { validateUserEntity } from 'src/domain/entities/user/user.invariants'
import { kindKeys } from 'src/domain/kindKeys'
import { v4 as uuidv4 } from 'uuid'

export class CreateNewUserError extends Error {
  type = 'CreateNewUserError' as const
}

type Args = {
  name: string
  age: number
  email: string
}

export const createNew = (
  args: Args,
): Result<UserEntity, CreateNewUserError> => {
  const createdUser = {
    kind: kindKeys.user,
    id: uuidv4(),
    name: args.name,
    age: args.age,
    email: args.email,
  }
  if (!validateUserEntity(createdUser)) {
    return err(new CreateNewUserError())
  }
  return ok(createdUser)
}
