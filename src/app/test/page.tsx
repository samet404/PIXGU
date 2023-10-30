// nextjs
import Image from 'next/image'
import { Pixelify_Sans } from 'next/font/google'
// images
import catPC from '@/png/catPC_.png'
import { NextFont } from '@next/font'

const pixelifySans: NextFont = Pixelify_Sans({
    subsets: ['latin'],
    weight: '400',
})

const speechBubbleText = 'azcık bekle hallediyom'

const Loading = () => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[rgb(255,235,5)] to-[rgb(54,205,247)]  text-[white]">
            <div className="blur-4 flex flex-col rounded-lg p-2 drop-shadow-[0_0px_4px_rgba(255,255,255,0.7)]">
                <div className="flex animate-bounce flex-col animate-normal animate-duration-[1400ms] animate-infinite animate-ease-out">
                    <div
                        className={`${pixelifySans.className} h-full w-full rounded-lg  bg-[rgba(255,255,255,0.7)] p-4 text-center text-[1.2rem] text-black`}
                    >
                        {speechBubbleText}
                    </div>
                    <div className="flex w-full flex-row justify-center">
                        <div className="h-0 w-0 border-[1rem] border-solid border-[transparent] border-t-[rgba(255,255,255,0.7)] bg-transparent"></div>
                    </div>
                </div>
                <Image src={catPC} alt="loading" className="w-[12rem] " />
            </div>
        </div>
    )
}
export default Loading
