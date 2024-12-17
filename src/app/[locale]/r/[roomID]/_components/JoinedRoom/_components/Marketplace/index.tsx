import { IsOpen } from './components/IsOpen'
import { Button } from './components/Button'

export const Marketplace = () => {
  return (
    <IsOpen>
      <div className="flex h-full w-full items-center justify-center">
        <Button name="letterHint" />
      </div>
    </IsOpen>
  )
}
