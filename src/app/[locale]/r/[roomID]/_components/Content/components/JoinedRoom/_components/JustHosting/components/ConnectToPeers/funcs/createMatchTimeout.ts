import { grayLog, mToMs } from '@/utils'
import { createMatch } from './createMatch'
import { useOtherHostRoomStatus } from '@/zustand/store/useOtherHostRoomStatus'

export const createMatchTimeout = () => {
  grayLog('CREATED MATCH TIMEOUT')
  return setTimeout(() => {
    createMatch()

    useOtherHostRoomStatus.getState().add({
      matchTimeout: createMatchTimeout(),
    })
  }, mToMs(1))
}
