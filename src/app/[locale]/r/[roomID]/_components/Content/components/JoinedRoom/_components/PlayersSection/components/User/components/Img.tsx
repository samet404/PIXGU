import Image from 'next/image'
import { useState } from 'react'

export const Img = ({ src }: Props) => {
  const [hasErr, sethasErr] = useState(false)

  if (hasErr) {
    return (
      <div className="size-8 flex-shrink-0 select-none rounded-full bg-white drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]"></div>
    )
  }

  return (
    <Image
      width={46}
      height={46}
      src={src}
      onError={() => sethasErr(true)}
      sizes="calc(1.15vw + 46px)"
      alt="profilePicture"
      className="h-full flex-shrink-0 select-none rounded-full drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]"
    />
  )
}

type Props = {
  src: string
}
