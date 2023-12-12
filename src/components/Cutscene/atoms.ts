import { is } from 'drizzle-orm'
import { atom } from 'jotai'

export const cutsceneStageNumberAtom = atom<number>(1)

export const decreaseCutsceneStageNumberAtom = atom(null, (get, set) => {
  if (get(cutsceneStageNumberAtom) >= 2)
    set(cutsceneStageNumberAtom, (prev) => prev - 1)
})

export const increaseCutsceneStageNumberAtom = atom(null, (get, set) => {
  const cutsceneNumber = get(cutsceneStageNumberAtom)
  const cutsceneStagesNumber = get(cutsceneStagesDataAtom)?.CutsceneStage
    ?.length

  if (cutsceneNumber != cutsceneStagesNumber!)
    set(cutsceneStageNumberAtom, (prev) => prev + 1)
})

export const cutsceneStageLengthAtom = atom(
  (get) => get(cutsceneStagesDataAtom)?.CutsceneStage?.length,
)

type CutsceneStagesDataAtomType = {
  CutsceneStage: {
    videoPath: string | null
    imagePath: string | null
    text: string | null
  }[]
} | null

export const cutsceneStagesDataAtom = atom<CutsceneStagesDataAtomType>(null)

export const setCutsceneStagesDataAtom = atom(
  null,
  (get, set, update: CutsceneStagesDataAtomType) =>
    set(cutsceneStagesDataAtom, () => update),
)

export const getCutsceneStageImagePathAtom = atom<string | null>((get) => {
  const cutsceneNumber = get(cutsceneStageNumberAtom)
  const imagePath = get(cutsceneStagesDataAtom)?.CutsceneStage[
    cutsceneNumber - 1
  ]?.imagePath

  if (imagePath) return imagePath
  else return null
})

export const getCutsceneStageVideoPathAtom = atom<string | null>((get) => {
  const cutsceneNumber = get(cutsceneStageNumberAtom)
  const videoPath = get(cutsceneStagesDataAtom)?.CutsceneStage[
    cutsceneNumber - 1
  ]?.videoPath

  if (videoPath) return videoPath
  else return null
})

export const getCutsceneStageTextAtom = atom<string | null>((get) => {
  const cutsceneNumber = get(cutsceneStageNumberAtom)
  const text = get(cutsceneStagesDataAtom)?.CutsceneStage[cutsceneNumber - 1]
    ?.text

  if (text) return text
  else return null
})

export const getSplitedCutsceneStageTextAtom = atom<string[] | null>((get) => {
  const text = get(getCutsceneStageTextAtom)

  if (text) {
    const splitedText = text.split('')

    const splitedTextWithComponents: Array<string> = []
    let componentText = ''
    let isSplitingComponent = false
    let closingTag = 0

    splitedText.forEach((element) => {
      if (element == '<') isSplitingComponent = true
      if (element == '>') closingTag++

      if (isSplitingComponent && closingTag <= 1)
        componentText = componentText.concat(element)

      if (!isSplitingComponent) splitedTextWithComponents.push(element)

      if (closingTag == 2) {
        closingTag = 0
        isSplitingComponent = false
        componentText = componentText.concat(element)
        splitedTextWithComponents.push(componentText)
        componentText = ''
      }
    })

    return splitedTextWithComponents
  } else return null
})
