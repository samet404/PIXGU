// import { clsxMerge } from '@/utils/clsxMerge'
// import { useAtom } from 'jotai'
// import { yesNoAtom } from './atoms'

export const BtnYes = () => {
  //   const [yesNo, setYesNo] = useAtom(yesNoAtom)

  return (
    <button
      onClick={() => {
        // if (yesNo === 'no') setYesNo('yes')
      }}
      className={
        // clsxMerge(
        // 'grow rounded-l-lg bg-[#ffffff39] px-2 py-1 duration-300',
        // {
        //   'bg-[#ffffff73]': yesNo === 'yes',
        // },   )
        'grow rounded-l-lg bg-[#ffffff39] px-2 py-1 duration-300'
      }
    >
      Yes (Not available)
    </button>
  )
}
