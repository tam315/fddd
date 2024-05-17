import { err, ok } from 'neverthrow'
import { templateEntityLogics } from 'src/domain/entities/template/template.logics'
import { userEntityLogics } from 'src/domain/entities/user/user.logics'
import { uuidRegex } from 'src/utils/regexValidators'
import { expect, test } from 'vitest'

test('createNewTemplate', () => {
  const result = ok(true)
    .andThen(() => {
      return userEntityLogics.createNew({
        name: 'おれだよおれおれ',
        email: 'test@test.com',
        age: 18,
      })
    })

    .andThen(user => {
      const result = templateEntityLogics.createNew({
        title: '俺のテンプレート',
        questions: ['ご飯食べました？', '歯磨きました？'],
      })
      if (result.isErr()) {
        return err(result.error)
      }
      return ok({ template: result.value, user })
    })

    .andThen(({ template, user }) =>
      ok(templateEntityLogics.setAuthor(template, user)),
    )

    .andThen(template =>
      templateEntityLogics.addQuestion(template, 'お風呂入りました？'),
    )

  if (result.isErr()) {
    switch (result.error.type) {
      case 'CreateNewTemplateError': {
        break
      }
      case 'AddQuestionError': {
        break
      }
      case 'CreateNewUserError': {
        break
      }
      default: {
        result.error satisfies never
      }
    }
    throw result.error
  }

  expect(result.value).toEqual({
    id: expect.stringMatching(uuidRegex),
    kind: 'domain/template',
    questions: ['ご飯食べました？', '歯磨きました？', 'お風呂入りました？'],
    title: '俺のテンプレート',
    author: {
      age: 18,
      email: 'test@test.com',
      id: expect.stringMatching(uuidRegex),
      kind: 'domain/user',
      name: 'おれだよおれおれ',
    },
  })
})
