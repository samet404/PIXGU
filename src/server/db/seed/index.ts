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
    await redisDb.sadd<string[]>('room_themes', themes)
    console.log('Themes added to redis')
  } catch (e) {
    console.error(`Error adding themes to redis`)
  }
}

run()
