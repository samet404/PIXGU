import { IsOpen } from './components/IsOpen'

export const Marketplace = () => {
  return (
    <IsOpen>
      <div className="flex h-full w-full flex-col p-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <div className="text-[3rem] leading-[4rem] text-[#ffffffdb]  drop-shadow-[0_0px_2px_rgba(0,0,0,0.70)]">
              Marketplace
            </div>
            <div className="pb-[0.40rem] text-[1.2rem] text-[#ffffffdb]  drop-shadow-[0_0px_2px_rgba(0,0,0,0.40)]">
              The mysterious salesman silently stares into your soul.
            </div>
          </div>
          <div className="pb-[0.40rem] text-[1.2rem] text-[#ffffffdb]  drop-shadow-[0_0px_2px_rgba(0,0,0,0.40)]"></div>
        </div>
        <div className="grid grid-cols-5 grid-rows-5 gap-2 "></div>
      </div>
    </IsOpen>
  )
}
