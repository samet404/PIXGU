import { Outfit } from 'next/font/google'
import type { PropsWithChildren } from 'react'
const outfit = Outfit({
    subsets: ['latin'],
    weight: ['700', '600', '500', '400'],
})

const Template = ({ children }: PropsWithChildren) => {
    return (
        <div
            style={{
                scrollbarWidth: 'thin'
            }}
            className='overflow-y-scroll overflow-x-hidden h-full w-full pb-4'>
            <div
                style={{
                    backgroundImage: 'radial-gradient(at 10% 0%, hsla(203,100%,50%,1) 0px, transparent 50%), radial-gradient(at 92% 26%, hsla(184,100%,76%,1) 0px, transparent 50%)'
                }}
                className='w-full h-full flex justify-center pt-7 px-2'
            >
                <div

                    className={`${outfit.className} animate-fade-up  w-full  h-full prose prose-headings:text-white prose-strong:text-white text-white`}>
                    {children}

                </div>
            </div>
        </div>)
}

export default Template