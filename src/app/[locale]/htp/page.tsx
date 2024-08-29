import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], weight: ['500', '700'] })

const HowToPlay = () => {
  return (
    <article
      className={`${outfit.className} xxl:w-full flex flex-col gap-8 p-5 pt-[10rem] text-center font-[700] text-white lg:w-[70%]`}
    >
      <h1>How To Play</h1>
      <section className="flex flex-col items-start rounded-lg border-[0.2rem] border-[#ffffff69] bg-sky-600 p-7">
        <p className="text-[1.2rem] font-[500] text-white">Hello</p>
      </section>
    </article>
  )
}

export default HowToPlay
