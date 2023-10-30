'use client'

import type { ComponentProps, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type BackButton = { children: ReactNode } & ComponentProps<'button'>

const BackButton = ({ children, ...rest }: BackButton) => {
    const router = useRouter()

    return (
        <button onClick={() => router.back()} {...rest}>
            {children}
        </button>
    )
}
export default BackButton
