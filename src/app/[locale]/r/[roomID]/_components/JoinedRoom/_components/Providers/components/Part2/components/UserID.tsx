import { UserIDContext } from '@/context/client'
import { type ReactNode } from 'react'

const UserID = ({ userID, children }: Props) => (
  <UserIDContext.Provider value={userID}>{children}</UserIDContext.Provider>
)

export default UserID

type Props = {
  userID: string
  children: ReactNode
}
