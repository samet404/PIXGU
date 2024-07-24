// import { useAtom } from 'jotai'
// import { yesNoAtom } from './atoms'
// import { clsxMerge } from '@/utils/clsxMerge'

export const BtnNo = () => {
  //   const [yesNo, setYesNo] = useAtom(yesNoAtom)
  return (
    <button
      //   onClick={() => {
      // if (yesNo === 'yes') setYesNo('no')
      //   }}
      className={
        //     clsxMerge(
        //     'grow  rounded-r-lg bg-[#ffffff39] px-2 py-1 duration-300',
        //     {
        //       'bg-[#ffffff6d]': yesNo === 'no',
        //     },
        //   )
        'grow rounded-r-lg bg-[#ffffff8e] px-2 py-1 duration-300'
      }
    >
      No
    </button>
  )
}
