'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import {
  cutsceneStageLengthAtom,
  cutsceneStageNumberAtom,
  decreaseCutsceneStageNumberAtom,
} from '../../../atoms'

const PreviousButton = () => {
  const decreaseCutsceneStageNumber = useSetAtom(decreaseCutsceneStageNumberAtom)

  const cutsceneStageNumber = useAtomValue(cutsceneStageNumberAtom)

  const isActive =  cutsceneStageNumber > 1 

  return (
    <button
      style={{
        backgroundColor: isActive
          ? 'rgba(255,255,255,0.2)'
          : 'rgba(255,255,255,0.1)',
      }}
      className="rounded-l-lg px-5 py-2 text-xl font-[900] text-[rgba(255,255,255,0.4)]"
      onClick={() => decreaseCutsceneStageNumber()}
    >
      {'<'}
    </button>
  )
}

export default PreviousButton
