'use client'

import { useDeveloperSettings } from '@/zustand/store'
import { SettingsCheckbox } from '../../_components/SettingsCheckbox'

export const DeveloperMode = () => {
  const isOpen = useDeveloperSettings((s) => s.isOpen)
  const switchSettings = useDeveloperSettings((s) => s.switch)

  return (
    <SettingsCheckbox
      onMouseDown={switchSettings}
      name="Enable developer mode"
      description="If you don't know what you are doing, don't enable it. Reduces performance and degrades site appearance."
      isChecked={isOpen}
    />
  )
}
