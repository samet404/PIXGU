"use client"

import type { OverrideProps } from '@/types'
import type { ComponentProps, PropsWithChildren } from 'react'

export const RefreshBtn = ({ onMouseDown, children, ...rest }: Props) =>
    <button
        onMouseDown={() => {
            onMouseDown?.()
            if (window) window.location.reload()
        }}
        {...rest}
    >
        {children}
    </button>

type Props = PropsWithChildren<
    OverrideProps<ComponentProps<'button'>, {
        onMouseDown?: () => void
    }>>