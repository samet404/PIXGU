import { api } from '@/trpc/react'
import { Inter } from 'next/font/google'
import { useEffect, type RefObject } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { clsxMerge } from '@/utils/clsxMerge'

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

type BtnJoinProps = {
  passInputRef: RefObject<HTMLInputElement>
}

const BtnJoin = ({ passInputRef }: BtnJoinProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { mutate, error, isLoading, isSuccess } =
    api.gameRoom.joinRoomWithPass.useMutation()

  useEffect(() => {
    if (isSuccess) router.refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleOnClick = () => {
    const password = passInputRef.current?.value

    if (!password) return null
    mutate({
      password: password,
      roomID: pathname.replace('/room/', ''),
    })
  }

  return (
    <button
      onClick={() => handleOnClick()}
      className={clsxMerge(
        `${inter.className} w-full rounded-md bg-yellow-200 py-1 text-[1.2rem] font-[700] text-[#00000060] duration-150`,
        {
          'animate-pulse': isLoading,
          'bg-rose-200': error,
          'bg-green-200': isSuccess,
        },
      )}
    >
      {isLoading
        ? 'Joining...'
        : error
          ? 'Wrong Password'
          : isSuccess
            ? 'Joined!'
            : 'Join'}
    </button>
  )
}
export default BtnJoin
