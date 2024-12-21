"use client"

import { useCustomCursor } from '@/zustand/store/useCustomCursor'
import dynamic from 'next/dynamic'

export const Content = dynamic(() => import('./Content').then(m => m.CustomCursor), { ssr: false })

export const CustomCursor = () => {
  const isOpen = useCustomCursor(s => s.isOpen)
  if (isOpen) return <Content />
}