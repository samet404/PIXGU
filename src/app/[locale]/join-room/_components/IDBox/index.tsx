import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

const IDBox = () => {
  return (
    <div
      className={`${urbanist.className} flex w-[10rem] flex-col items-center rounded-md bg-[#ff37a5c2] text-white shadow-[0_2px_7px_1px_rgba(0,0,0,0.3)]`}
    >
      <div className="w-full bg-[#00000019] px-3 py-1 text-center">
        have a room ID ?
      </div>
      <div className="flex flex-col gap-2 p-2">
        <input
          type="text"
          className="flex w-full min-w-0 grow rounded-md bg-[#ffffff34] px-2 py-[0.15rem]"
        />
        <button className="flex items-center justify-center rounded-md bg-[#ffffff6f] px-2">
          Join
        </button>
      </div>
    </div>
  )
}
export default IDBox
