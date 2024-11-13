import { Outfit } from 'next/font/google'
import Content from './Content.mdx'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '400', '300'],
})

const HowToPlay = () => {
  return (
    <div
      style={{
        scrollbarWidth: 'thin'
      }}
      className='overflow-y-scroll overflow-x-hidden h-full w-full pb-4'>
      <div
        style={{
          backgroundImage: 'radial-gradient(at 10% 0%, hsla(269,100%,50%,1) 0px, transparent 50%), radial-gradient(at 92% 26%, hsla(293,100%,76%,1) 0px, transparent 50%)'
        }}
        className='animate-fade w-full h-full flex justify-center pt-7 px-2'
      >
        <div

          className={`${outfit.className} selection:!bg-[#a450ff] animate-fade-up  w-full  h-full prose prose-headings:text-white prose-strong:text-white text-white`}>
          <Content />
          <div className='pt-7'></div>
        </div>
      </div>
    </div>

  )
}

export default HowToPlay
