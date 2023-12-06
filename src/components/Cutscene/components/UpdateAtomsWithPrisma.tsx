'use client'

import { useAtom, useSetAtom } from 'jotai'
import { type ReactNode } from 'react'
import {
  cutsceneTextsDataAtom,
  setCutsceneImagesDataAtom,
  setCutsceneTextsDataAtom,
  setCutsceneVideosDataAtom,
} from '../atoms'

type UpdateAtomWithPrismaProps = {
  cutsceneImagesData: {
    images: {
      path: string
      stage: number
    }[]
  } | null

  cutsceneVideosData: {
    videos: {
      path: string
      stage: number
    }[]
  } | null

  cutsceneTextsData: {
    texts: {
      value: string
      stage: number
    }[]
  } | null

  children: ReactNode
}

const UpdateAtomsWithPrisma = ({
  cutsceneImagesData,
  cutsceneVideosData,
  cutsceneTextsData,
  children,
}: UpdateAtomWithPrismaProps) => {
  const setCutsceneImagesData = useSetAtom(setCutsceneImagesDataAtom)
  const setCutsceneVideosData = useSetAtom(setCutsceneVideosDataAtom)
  const setCutsceneTextsData = useSetAtom(setCutsceneTextsDataAtom)

  const [cutsceneTextsDataTest] = useAtom(cutsceneTextsDataAtom)
  console.log(cutsceneTextsDataTest)

  setCutsceneImagesData(cutsceneImagesData)
  setCutsceneVideosData(cutsceneVideosData)
  setCutsceneTextsData(cutsceneTextsData)

  return children
}

export default UpdateAtomsWithPrisma
