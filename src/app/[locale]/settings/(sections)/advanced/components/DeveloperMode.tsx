'use client'

import { SettingsCheckbox } from '@/components/SettingsCheckbox'
import { api } from '@/trpc/react'
import { useSettings } from '@/zustand/store'

export const DeveloperMode = () => {
  const checked = useSettings((s) => s.developerMode)
  const setChecked = useSettings((s) => s.setDeveloperMode)

  const {
    data: defaultChecked,
    isLoading,
    refetch,
    isFetched,
  } = api.settings.getDeveloperMode.useQuery(undefined, {
    enabled: false,
  })

  if (!isFetched) refetch()

  const { mutate, isLoading: isMutating } =
    api.settings.setDeveloperMode.useMutation({
      onSuccess: () => {
        if (checked) {
          setChecked(!checked)

          return
        }
        setChecked(!defaultChecked)

        console.log(checked)
      },
    })

  console.log(checked, defaultChecked)

  return (
    <SettingsCheckbox
      onMouseDown={() => {
        if (isLoading || isMutating) return

        if (checked) {
          mutate({ isEnabled: !checked })
          console.log('checked')
        } else {
          mutate({ isEnabled: !defaultChecked })
          console.log('defaultchecked')
        }
      }}
      name="Enable developer mode"
      description="Don't enable this if you don't know what you are doing and it reduces performance."
      isChecked={checked ?? defaultChecked}
      isLoading={isLoading || isMutating}
    />
  )
}
