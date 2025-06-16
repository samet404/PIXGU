'use client'

import { useDeveloperSettings } from '@/zustand/store/useDeveloperSettings'
import { SettingsCheckbox } from '../../_components/SettingsCheckbox'

export const DeveloperMode = ({ description, heading }: Props) => {
  const isOpen = useDeveloperSettings((s) => s.isOpen)
  const switchSettings = useDeveloperSettings((s) => s.switch)

  return (
    <SettingsCheckbox
      onMouseDown={switchSettings}
      name={heading}
      description={description}
      isChecked={isOpen}
    />
  )
}

type Props = {
  heading: string
  description: string
}