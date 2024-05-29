import { redisDb } from '@/db/redis'

const page = async () => {
  const start = Date.now()

  const sismember = await redisDb.sismember('test2', 'a')

  const durationMs = Date.now() - start
  console.log(`${sismember} with ${durationMs} ms`)

  return null
}
export default page
