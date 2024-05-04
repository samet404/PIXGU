import errImg from '@/png/icons8-error-48.png'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  weight: ['700', '600'],
  subsets: ['latin'],
})

const Link = dynamic(() => import('next/link'))

const ErrDisplay = ({ msg, code, reason, redirectTo, ...others }: Props) => {
  return (
    <div className="absolute bottom-6 flex w-full animate-fade-up justify-center selection:!bg-rose-200 selection:text-rose-500">
      <div
        {...others}
        className={`${urbanist.className} group relative z-50 flex animate-[err-pulse-shadow_2s_ease-in-out_infinite] flex-col items-center gap-2 rounded-lg bg-rose-500 p-2 `}
      >
        <div className="jtustify-between flex w-full flex-row gap-2">
          <p className="text-[0.9rem] font-[700] text-[rgba(255,255,255,0.8)]">
            {msg}
          </p>
          <Image src={errImg} className="size-6 opacity-80" alt="error" />
        </div>

        {reason || code ? (
          <div className="flex w-full flex-col items-center gap-[0.3rem] rounded-md bg-gradient-to-br from-[rgba(255,255,255,0.25)] via-[rgba(255,255,255,0.25)] to-[rgba(255,255,255,0.20)] px-2 py-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)]">
            {reason ? (
              <p className="max-w-[60rem] text-[0.8rem] font-[600] leading-4 text-[rgba(255,255,255,0.7)]">
                {reason}
              </p>
            ) : null}

            {code ? (
              <div className="text-[0.8rem] font-[600] text-[rgba(255,255,255,0.6)]">
                code: {code}
              </div>
            ) : null}
          </div>
        ) : null}

        {redirectTo ? (
          <Link
            href={redirectTo}
            className="z-20 select-none rounded-lg bg-[#ffffff34] px-2 py-1 text-[1.1rem] font-[700] text-[#ffffffbb] shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)] duration-300 hover:bg-[#ffffff5b]"
          >
            Go to {redirectTo == '/' ? 'home' : redirectTo.replace('/', '')}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export default ErrDisplay

import type { ComponentProps } from 'react'

type Props = {
  msg: string
  code?: number
  reason?: string
  redirectTo?: string
} & ComponentProps<'div'>
