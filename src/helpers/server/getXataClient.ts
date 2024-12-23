import 'server-only'
import { getXataClient as xataClient } from '@/src/xata'

export const getXataClient = () => xataClient()
