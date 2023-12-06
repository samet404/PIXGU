'use client'

import { useAtom, useSetAtom } from 'jotai'
import {
  cutsceneStageAtom,
  increaseCutsceneStageAtom,
} from '../../../atoms'

const NextButton = () => {
  const increaseCutsceneStage = useSetAtom(increaseCutsceneStageAtom)
  const [cutsceneStage] = useAtom(cutsceneStageAtom)
  console.log(cutsceneStage)

  return (
    <button
      className="rounded-md bg-yellow-200 px-5 py-2 font-[900]"
      onClick={() => increaseCutsceneStage()}
    >
      {'>'}
    </button>
  )
}

export default NextButton
