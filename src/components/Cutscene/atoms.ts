import { atom } from 'jotai'

export const cutsceneStageAtom = atom<number>(1)

export const increaseCutsceneStageAtom = atom(null, (get, set) => {
  set(cutsceneStageAtom, (prev) => prev + 1)
})

export const decreaseCutsceneStageAtom = atom(null, (get, set) => {
  if (get(cutsceneStageAtom) >= 2)
    set(cutsceneStageAtom, (prev) => prev - 1)
})

type CutsceneImagesDataAtomType = {
  images: {
    path: string
    stage: number
  }[]
} | null

type CutsceneVideosDataAtomType = {
  videos: {
    path: string
    stage: number
  }[]
} | null

type CutsceneTextsDataAtomType = {
  texts: {
    value: string
    stage: number
  }[]
} | null

export const cutsceneImagesDataAtom = atom<CutsceneImagesDataAtomType>(null)
export const cutsceneVideosDataAtom = atom<CutsceneVideosDataAtomType>(null)
export const cutsceneTextsDataAtom = atom<CutsceneTextsDataAtomType>(null)

export const setCutsceneImagesDataAtom = atom(
  null,
  (get, set, update: CutsceneImagesDataAtomType) => {
    set(cutsceneImagesDataAtom, () => update)
  },
)

export const setCutsceneVideosDataAtom = atom(
  null,
  (get, set, update: CutsceneVideosDataAtomType) => {
    set(cutsceneVideosDataAtom, () => update)
  },
)

export const setCutsceneTextsDataAtom = atom(
  null,
  (get, set, update: CutsceneTextsDataAtomType) => {
    set(cutsceneTextsDataAtom, () => update)
  },
)

export const cutsceneImagePathAtom = atom<string>('')
export const cutsceneVideoPathAtom = atom<string>('')
export const cutsceneTextValueAtom = atom<string>('')
