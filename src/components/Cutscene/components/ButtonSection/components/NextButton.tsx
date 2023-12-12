'use client'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  cutsceneStageLengthAtom,
  cutsceneStageNumberAtom,
  increaseCutsceneStageNumberAtom,
} from '../../../atoms'

const NextButton = () => {
  const increaseCutsceneStageNumber = useSetAtom(increaseCutsceneStageNumberAtom)
  const cutsceneStageNumber = useAtomValue(cutsceneStageNumberAtom)
  const cutsceneStageLength = useAtomValue(cutsceneStageLengthAtom)

  const isActive = cutsceneStageLength! > cutsceneStageNumber

  return (
    <button
      style={{backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}}
      className="rgba(255,255,255,0.2) px-5  py-2 text-xl font-[900] text-[rgba(255,255,255,0.4)]"
      onClick={() => increaseCutsceneStageNumber()}
    >
      {'>'}
    </button>
  )
}

export default NextButton
