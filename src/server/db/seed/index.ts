import { redisDb } from '@/db/redis'
import { themes } from './data.json'

const run = async () => {
  await redisDb.flushall()
  console.log('Redis flushed ✅')

  Object.keys(themes).forEach((lang) =>
    themes[lang as keyof typeof themes].forEach(
      async (theme) => await redisDb.sadd<string>(`room_themes:${lang}`, theme),
    ),
  )
  console.log('Themes added to redis ✅')
}

run()
