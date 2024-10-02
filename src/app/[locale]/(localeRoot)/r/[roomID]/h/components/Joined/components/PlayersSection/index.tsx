import { Count } from './components/Count'
import { Players } from './components/Players'

export const PlayersSection = () => {
  return (
    <section className="flex w-[90%] flex-col items-start gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex w-[90%] flex-col gap-1 text-[2rem] text-white">
          Players:
        </div>
        <Count />
      </div>

      <Players />
    </section>
  )
}
