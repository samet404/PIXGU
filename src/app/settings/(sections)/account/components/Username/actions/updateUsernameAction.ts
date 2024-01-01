'use server'

import { auth } from '@/auth/lucia'
import { LuciaError } from 'lucia'
import * as context from 'next/headers'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'

type updateUsernameProps = {
  newUsername: string
}

export const updateUsernameAction = async ({
  newUsername,
}: updateUsernameProps) => {
  const usernameInputTextSchema = z
    .string()
    .max(64, "Username can't higher than 64 character")
    .min(1, 'Username must be at least 1 character')

  try {
    usernameInputTextSchema.parse(newUsername)
  } catch (e) {
    if (e instanceof ZodError) {
      const validationErrorMessage = fromZodError(e).message.replace(
        'Validation error:',
        '',
      )
      throw new Error(validationErrorMessage)
    }
  }

  const authRequest = auth.handleRequest('GET', context)
  const session = await authRequest.validate()

  if (!session?.user.userId) throw new Error('No user id')

  try {
    const user = await auth.updateUserAttributes(
      session.user.userId,
      {
        username: newUsername,
      }, // expects partial `Lucia.DatabaseUserAttributes`
    )
  } catch (e) {
    if (e instanceof LuciaError && e.message === `AUTH_INVALID_USER_ID`) {
      throw new Error('invalid user id')
    }
    throw new Error(
      'Provided user attributes violates database rules (e.g. unique constraint) or unexpected database error',
    )
  }
}
