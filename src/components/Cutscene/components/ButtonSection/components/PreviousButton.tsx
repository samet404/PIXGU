'use client'

import { useSetAtom } from 'jotai'
import { decreaseCutsceneStageAtom } from '../../../atoms'

const PreviousButton = () => {
  const decreaseCutsceneStage = useSetAtom(decreaseCutsceneStageAtom)

  return (
    <button
      className="rounded-md bg-yellow-200 px-5 py-2 font-[900]"
      onClick={() => decreaseCutsceneStage()}
    >
      {'<'}
    </button>
  )
}

export default PreviousButton
