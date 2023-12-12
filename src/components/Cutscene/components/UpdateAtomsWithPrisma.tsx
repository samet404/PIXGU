'use client'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { type ReactNode } from 'react'
import { cutsceneStagesDataAtom, setCutsceneStagesDataAtom } from '../atoms'

type UpdateAtomWithPrismaProps = {
  cutsceneStagesDataPropFromPrisma: {
    CutsceneStage: {
      videoPath: string | null
      imagePath: string | null
      text: string | null
    }[]
  } | null

  children: ReactNode
}

const UpdateAtomsWithPrisma = ({
  cutsceneStagesDataPropFromPrisma,
  children,
}: UpdateAtomWithPrismaProps) => {
  const setCutsceneStagesData = useSetAtom(setCutsceneStagesDataAtom)
  setCutsceneStagesData(cutsceneStagesDataPropFromPrisma)
  return children
}

export default UpdateAtomsWithPrisma