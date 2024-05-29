import { UserIDContext } from '@/context/client'
import { type ReactNode } from 'react'

const UserID = ({ UserID, children }: Props) => (
  <UserIDContext.Provider value={UserID}>{children}</UserIDContext.Provider>
)

export default UserID

type Props = {
  UserID: string
  children: ReactNode
}
