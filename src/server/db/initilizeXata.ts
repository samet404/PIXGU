import { env } from '@/env/server'

const isCanary = env.CANARY === '1'
const apiKey = env.XATA_API_KEY
Bun.spawn(['bun', 'add', '@xata.io/client@next'])
Bun.spawn(['xata', 'auth', 'login', `--api-key=${apiKey}`, '--force', '--no-input'])
Bun.spawn(['bun', 'run', isCanary ? 'xata:init:canary' : 'xata:init'])