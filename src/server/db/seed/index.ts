import { redisDb } from '@/db/redis'
import { themes } from './data.json'

const run = async () => {
  try {
    await redisDb.flushall()
    console.log('Redis flushed')
  } catch (e) {
    console.error(`Error flushing redis`)
  }

  try {
    themes.forEach(async (v) => await redisDb.sadd<string>('room_themes', v))
    console.log('Themes added to redis')
  } catch (e) {
    console.error(`Error adding themes to redis`)
  }
}

run()
