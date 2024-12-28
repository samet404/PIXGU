import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/png/logo.png'
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div
            style={{
                scrollbarWidth: 'thin',

            }}
            className='overflow-y-scroll relative overflow-x-hidden h-full w-full pb-4'>
            <div className='flex flex-col items-center'>
                <div
                    className=' h-full flex flex-col  gap-5 justify-center pt-7 px-2'>
                    <Link href='/'>
                        <Image
                            src={Logo}
                            alt="logo"
                            className="size-[6rem] select-none object-contain"
                            sizes="calc(2.33vw + 90px)"
                        ></Image>
                    </Link>


                    {children}
                </div>
            </div>
        </div>

    )
}

export default Layout
