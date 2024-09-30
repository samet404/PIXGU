'use client'

import { api } from '@/trpc/react'
import { useSettings } from '@/zustand/store'
import { SettingsCheckbox } from '../../_components/SettingsCheckbox'

export const DeveloperMode = () => {
  const checked = useSettings((s) => s.developerMode)
  const setChecked = useSettings((s) => s.setDeveloperMode)
  const { mutate, isLoading } = api.settings.setDeveloperMode.useMutation({
    onSuccess: () => setChecked(!checked),
    onError: (e) => {
      console.error(e)
    },
  })

  return (
    <SettingsCheckbox
      onMouseDown={() => mutate({ isEnabled: !checked })}
      name="Enable developer mode"
      description="If you don't know what you are doing, don't enable it. Reduces performance and degrades site appearance."
      isChecked={checked}
      isLoading={isLoading}
    />
  )
}
