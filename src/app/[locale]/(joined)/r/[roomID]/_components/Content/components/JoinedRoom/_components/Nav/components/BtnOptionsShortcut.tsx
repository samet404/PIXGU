"use client"

import { UseShortcut } from '@/components/UseShortcut'
import { switchModalAtom } from './BtnOptions/atoms'
import { useSetAtom } from 'jotai'

export const BtnOptionsShortcut = () => <UseShortcut keyName='Escape' onShortcut={useSetAtom(switchModalAtom)} />
