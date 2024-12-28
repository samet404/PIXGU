import { Outfit } from 'next/font/google'
import type { PropsWithChildren } from 'react'
const outfit = Outfit({
    subsets: ['latin'],
    weight: ['700', '600', '500', '400'],
})

const Template = ({ children }: PropsWithChildren) => {
    return (
        <div className={`${outfit.className} animate-fade-up  w-full  h-full prose prose-headings:text-white prose-strong:text-white text-white`}>
            {children}
        </div>
    )
}

export default Template