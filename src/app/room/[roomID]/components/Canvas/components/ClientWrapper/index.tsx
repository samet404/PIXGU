'use client'

import { type ReactNode } from 'react'
import { useCanvasDraw } from './hooks/useCanvasDraw'

type ClientWrapperProps = {
  children: ReactNode
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  useCanvasDraw()

  return children
}
export default ClientWrapper
