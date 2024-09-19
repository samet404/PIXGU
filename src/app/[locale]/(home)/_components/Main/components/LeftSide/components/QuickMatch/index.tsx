'use client'

import MainButton from '../MainButton'
import Image from 'next/image'
import play from '@/png/play.png'
import { useRouter } from 'next/navigation'
import { api } from '@/trpc/client'
import { useSetAtom } from 'jotai'
import { isThereAreRoomAtom } from './atoms'
import { NoPublicRoom } from './components/NoPublicRoom'

const QuickMatch = ({ name, description }: Props) => {
  const router = useRouter()
  const setIsThereAreRoom = useSetAtom(isThereAreRoomAtom)

  return (
    <MainButton
      // TODO fix
      // @ts-expect-error
      onMouseDown={async (e, options) => {
        setIsThereAreRoom(true)

        const randomID = await api.gameRoom.getRandomPublicRoomID.query()
        if (randomID) router.push(`/r/${randomID}`)
        else if (!randomID) {
          options.cancelLoading()
          setIsThereAreRoom(false)
        }
      }}
      icon={
        <Image
          className="size-12 opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
          src={play}
          alt="quick-match"
        />
      }
      name={name}
      description={description}
      keyName="3"
      className="h-full w-full rounded-tl-md hover:from-[rgba(53,255,147,0.4)] hover:to-[rgba(255,255,255,0.3)]"
    >
      <NoPublicRoom />
    </MainButton>
  )
}

export default QuickMatch

type Props = {
  name: string
  description: string
}
