import { useGameEndedPanel } from '@/zustand/store/useGameEndedPanel'

export const Timer = () => {
  const width = useGameEndedPanel((s) => s.value.timerPassedMsWithPercent)

  return (
    <div
      style={{
        width: `${width ?? 0}%`,
      }}
      className={`absolute  left-0 top-0 h-6 bg-[#ffffff71] shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] duration-75`}
    ></div>
  )
}
