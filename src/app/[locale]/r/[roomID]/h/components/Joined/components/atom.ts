import { atom } from 'jotai'
import type { Item } from './Navbar'

export const selectedPanelItemAtom = atom<Item>('Players')