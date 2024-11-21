'use server'

import { lucia } from '@/auth/lucia'
import { validateRequest } from '@/auth/lucia/validateRequest'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const logout = async (): Promise<ActionResult> => {
  'use server'
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
    ; (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
  return redirect('/start')
}

type ActionResult = {
  error: string | null
}
