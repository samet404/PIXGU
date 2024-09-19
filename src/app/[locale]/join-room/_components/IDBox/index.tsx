import { Urbanist } from 'next/font/google'
import { InputAndBtn } from './components/InputAndBtn'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

const IDBox = () => {
  return (
    <div
      className={`${urbanist.className} flex w-[10rem] flex-col items-center rounded-md bg-[#ff37a5c2] text-white shadow-[0_2px_7px_1px_rgba(0,0,0,0.3)]`}
    >
      <div className="flex flex-col gap-2 p-2">
        <InputAndBtn />
      </div>
    </div>
  )
}
export default IDBox
