import { Result } from 'neverthrow'

// 最低限の縛りだけかけておく。satisfiesで使うことを想定。

export type EntityLogic<Entity> = (firstArg: Entity, ...restArgs: any) => Entity

export type EntityLogicFailable<Entity> = (
  firstArg: Entity,
  ...restArgs: any
) => Result<Entity, unknown>
