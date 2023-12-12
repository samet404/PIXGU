import { type PartialRecord } from '@/types/partialRecord'
import { atom } from 'jotai'

type textInputValuesAtomType = PartialRecord<'name' | 'value', string>[]
export const textInputValueGroupAtom = atom<textInputValuesAtomType>([])

export const textInputValueGroupLengthAtom = atom(
  (get) => get(textInputValueGroupAtom).length,
)

type addToTextInputValueGroupUpdateType = {
  name: string
  value: string
}

export const addToTextInputValueGroup = atom(
  null,
  (get, set, update: addToTextInputValueGroupUpdateType) => {
    const textInputValueGroup = get(textInputValueGroupAtom)

    const newTextInputValueGroup = [
      ...textInputValueGroup,
      { name: update.name, value: update.value },
    ]

    set(textInputValueGroupAtom, () => newTextInputValueGroup)
  },
)
