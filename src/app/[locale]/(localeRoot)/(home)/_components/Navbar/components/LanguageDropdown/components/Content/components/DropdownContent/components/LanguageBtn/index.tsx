'use client'

import { api } from '@/trpc/react'
import type { Locale } from '@/types'

const LanguageBtn = ({ locale }: Props) => {
  const { mutate } = api.user.setNewLocale.useMutation({
    onSuccess: () => window.location.reload(),
  })

  const handleOnClick = () => mutate(locale)

  return (
    <button
      onClick={handleOnClick}
      className="rounded-md bg-[rgba(0,0,0,0.3)] p-1 text-[rgba(255,255,255,0.5)]"
    >
      {locale.toUpperCase()}
    </button>
  )
}

export default LanguageBtn

type Props = {
  locale: Locale
}
