import { redisDb } from '@/db/redis'
import { cookies } from 'next/headers'
import { z } from 'zod'

export async function GET(req: Request) {
  const authToken = cookies().get('guest-auth-token')?.value
  console.log(req)
  console.log('authToken: ', authToken)
  // try {
  //   z.string().min(10).cuid2().parse(authToken)
  // } catch (error) {
  //   return new Response(JSON.stringify(false))
  // }

  const guestID = await redisDb.get(`guest:token:${authToken}:ID`)
  console.log('guestID: ', guestID)
  const isValid = guestID ? true : false

  console.log('isValid23: ', isValid)

  return new Response(JSON.stringify(isValid))
}
