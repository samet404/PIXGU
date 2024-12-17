import { useGameEndedPanel } from '@/zustand/store'

export const Timer = () => {
  const width = useGameEndedPanel((s) => s.value.timerPassedMsWithPercent)

  return (
    <div
      style={{
        width: `${width ?? 0}%`,
      }}
      className={`absolute  left-0 top-0 h-6 bg-[#ffffffca] duration-75`}
    ></div>
  )
}
