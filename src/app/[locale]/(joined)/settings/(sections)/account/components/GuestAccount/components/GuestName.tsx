import { redisDb } from '@/db/redis'
import { cookies } from 'next/headers'

export const GuestName = async () => {
  const token = cookies().get('guest-auth-token')?.value
  const ID = await redisDb.get(`guest:token:${token}:ID`)
  const name = await redisDb.get(`guest:${ID}:name_&_name_ID`)

  return (
    <div className="flex h-full items-center text-[2rem] text-white">
      {name}
    </div>
  )
}
