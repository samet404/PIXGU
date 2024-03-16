import localFont from 'next/font/local'
import { type Ref, forwardRef } from 'react'

const pixeloid = localFont({
  src: '../../../../../../../../../public/font/Pixeloid/PixeloidSans-mLxMm.ttf',
})

const PassInput = forwardRef((_: unknown, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      type="text"
      className={`${pixeloid.className} bg-[#ff910072] p-1 text-[1.2rem] text-yellow-100  shadow-[0_0px_10px_1px_rgba(255,255,255,0.1)]`}
    />
  )
})

PassInput.displayName = 'PassInput'

export default PassInput
