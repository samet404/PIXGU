'use client'

import { useSelectThemePanel } from '@/zustand/store'

export const A = () => {
  const panelValues = useSelectThemePanel((s) => s.value)

  return JSON.stringify(panelValues, null, 2)
}
