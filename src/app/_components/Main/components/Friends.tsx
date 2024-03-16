import MainButton from './MainButton'
import Image from 'next/image'
import friends from '@/png/friends.png'
import clsx from 'clsx'
import { api } from '@/src/trpc/server'

const Friends = async () => {
  const session = await api.user.getSession.query()

  if (!session) return null
  if (session)
    return (
      <div>
        <MainButton
          link="/f"
          icon={
            <Image
              className="size-12 opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
              src={friends}
              alt="friends?"
            />
          }
          name="Arkadaşlar"
          description="Arkadaşınla konuş, arkadaş ekle veya çıkar"
          keyName="3"
          className={clsx(
            'h-full w-full rounded-br-md hover:from-[rgba(53,141,255,0.4)] hover:to-[rgba(255,255,255,0.3)]',
          )}
        />
      </div>
    )
}

export default Friends
