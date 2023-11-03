import Image from 'next/image'
import notFound from 'public/images/png/404.png'
import { Pixelify_Sans } from 'next/font/google'

import { Fragment, CSSProperties } from 'react'
import BackButton from '../components/BackButton'
import Link from 'next/link'
import AnimatedCursor from 'react-animated-cursor'

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
})

const animatedCursorStyles: Record<string, CSSProperties> = {
  outerStyle: {
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.6)',
  },
}


const Notfound = () => {
  return (
    <Fragment>
      <AnimatedCursor
        outerStyle={animatedCursorStyles.outerStyle}
        innerSize={8}
        outerSize={8}
        color="255, 255, 255"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        clickables={[
          'img',
          'a',
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
          'button',
          '.link',
        ]}
      />
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[pink] to-[#ff3877]">
        <Image
          src={notFound}
          placeholder="blur"
          sizes="(min-width: 480px) 403px, 86.54vw"
          alt="404"
          className="select-none rounded-lg p-5 drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)]"
        />

        <div
          className={`${pixelifySans.className}  text-[1.5rem] text-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.5)] selection:bg-[#ab4859]`}
        >
          PAGE NOT FOUND
        </div>

        <div className="flex flex-row gap-3">
          <BackButton
            className={`${pixelifySans.className} rounded-md bg-[rgba(255,255,255,0.25)] py-1 px-2 text-[1.2rem] text-white`}
          >
            <div className=" select-none">Geri</div>
          </BackButton>
          <Link href={'/'}>
            <button
              className={`${pixelifySans.className} rounded-md bg-[rgba(255,255,255,0.25)] py-1 px-2 text-[1.2rem] text-white`}
            >
              <div className=" select-none">Anasayfa</div> 
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  )
}
export default Notfound
