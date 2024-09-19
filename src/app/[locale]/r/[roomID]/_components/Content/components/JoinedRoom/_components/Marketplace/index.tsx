import { IsOpen } from './components/IsOpen'
import Image from 'next/image'
import background from '@/png/market.png'
import { Button } from './components/Button'

export const Marketplace = () => {
  return (
    <IsOpen>
      <div className="flex h-full w-full flex-row">
        <Image
          src={background}
          alt="marketplace"
          className="z-99 flex-shrink-0"
        />
        <div
          style={{
            scrollbarWidth: 'none',
          }}
          className="flex w-full grid-cols-5 gap-4 overflow-y-scroll p-2 "
        >
          <Button name="letterHint" price={200} />
          <Button name="ai" price={200} />
        </div>
      </div>
    </IsOpen>
  )
}
