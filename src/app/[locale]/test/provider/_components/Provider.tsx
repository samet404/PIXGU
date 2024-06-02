'use client'

import { TestContext } from '../../../../../context/client/react/taest'

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TestContext.Provider
      value={{
        value: 'dsa',
      }}
    >
      {children}
    </TestContext.Provider>
  )
}
