'use client'

import { useRef, useState } from 'react'
import { SettingsBtn } from '../../_components/SettingsBtn'

export const ClearLocalstorage = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isClicked, setIsClicked] = useState<boolean>(false)

  return (
    <SettingsBtn
      onMouseDown={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        localStorage.clear()
        timeoutRef.current = setTimeout(() => {
          setIsClicked(false)
        }, 3000)
        setIsClicked(true)
      }}
      className="bg-rose-500"
      name={isClicked ? 'Cleaned' : 'Clear local storage'}
      description="Clears all local data on browser"
    />
  )
}
