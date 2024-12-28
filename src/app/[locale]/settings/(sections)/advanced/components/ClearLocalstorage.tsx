'use client'

import { SettingsBtn } from '../../_components/SettingsBtn'

export const ClearLocalstorage = ({ description, heading }: Props) => {
  return (
    <SettingsBtn
      onMouseDown={() => localStorage.clear()}
      className="bg-rose-500"
      name={heading}
      description={description}
    />
  )
}

type Props = {
  description: string
  heading: string
}