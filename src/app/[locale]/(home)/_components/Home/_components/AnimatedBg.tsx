'use client'

import dynamic from 'next/dynamic'

const NeonLines = dynamic(() => import('@/components/Lines').then((m) => m.NeonLines), {
    ssr: false
})

export const AnimatedBg = () => <NeonLines />