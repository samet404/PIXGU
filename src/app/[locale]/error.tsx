"use client"

import type { Locale } from '@/types/locale'
import dynamic from 'next/dynamic';

const TrError = dynamic(() => import('./_components/error/tr').then(m => m.TrError))
const EnError = dynamic(() => import('./_components/error/en').then(m => m.EnError))

const Error = ({ error, reset, locale }: Props) => {
    const localeInURL = new URL(window.location.href).pathname.split('/')[1];

    if (localeInURL === 'tr') return <TrError error={error} reset={reset} />
    return <EnError error={error} reset={reset} />
}

export default Error

type Props = {
    locale: Locale
} & { error: Error & { digest?: string }; reset: () => void }