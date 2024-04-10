import MainButton from './MainButton'
import Image from 'next/image'
import magnify from '@/png/magnifiy.png'
import clsx from 'clsx'
import { api } from '@/trpc/server'

const FindRoom = async () => {
  const session = await api.auth.getSession.query()

  if (!session) return null

  return (
    <div>
      <MainButton
        link="/f"
        icon={
          <Image
            className="size-12 opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
            src={magnify}
            alt="find-room"
          />
        }
        name="Oda bul"
        description="Rastgele bir oda bul ve katıl."
        keyName="3"
        className={clsx(
          'h-full w-full rounded-tl-md hover:from-[rgba(53,255,147,0.4)] hover:to-[rgba(255,255,255,0.3)]',
        )}
      />
    </div>
  )
}

export default FindRoom
