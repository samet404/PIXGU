import { Info } from './components/Info'

export const Players = () => {
  return (
    <div className="flex w-[90%] flex-col">
      <div className="flex w-[90%] flex-col gap-1 text-[2rem] text-white">
        Players:
      </div>
      <Info />
    </div>
  )
}
