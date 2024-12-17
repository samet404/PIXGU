import { env } from '@/env/server'

console.log('Xata database is initilizing...')

const isCanary = env.CANARY === '1'
Bun.spawn(["bun", "run", isCanary ? 'xata:init:canary' : 'xata:init'])

console.log('Xata database is initilized!')