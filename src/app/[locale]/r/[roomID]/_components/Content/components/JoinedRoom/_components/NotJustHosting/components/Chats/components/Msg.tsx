import Image from 'next/image'

export const Msg = ({ ID, msg, name, pfp }: Props) => {
  return (
    <div className="flex flex-row gap-[0.40rem]">
      <div className="pt-2">
        {pfp ? (
          <Image
            src={pfp}
            alt="pfp"
            className="size-8 rounded-full"
            sizes="2w32"
          />
        ) : (
          <div className="flex size-8 flex-shrink-0 rounded-full bg-white"></div>
        )}
      </div>
      <div className="flex w-[90%] flex-col gap-2">
        <div className="pt-2 text-[1.2rem] leading-3 text-white">404</div>
        <div className="flex break-all rounded-md bg-gradient-to-r from-[#ffffff5f] to-transparent px-2 py-1 leading-5 text-[#0000006d]">
          {msg}
        </div>
        <div className="text-[0.4rem] leading-3 text-white">{ID}</div>
      </div>
    </div>
  )
}

type Props = {
  ID: string
  name: string
  msg: string
  pfp: string | null
}
