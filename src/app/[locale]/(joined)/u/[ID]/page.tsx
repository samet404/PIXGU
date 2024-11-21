import { api } from '@/trpc/server'
import { LeftInfo } from './components/LeftInfo'

type UserPageProps = {
  params: { ID: string }
}

const User = async ({ params }: UserPageProps) => {
  const { ID } = await params
  const user = await api.user.getByID.query(ID)
  if (!user) return <h1 className="w-full pt-8 text-center">User not found</h1>

  const { profilePicture, username, usernameID, usernameWithUsernameID } = user

  return (
    <div className="flex h-full w-full flex-row gap-3 p-2">
      <LeftInfo
        ID={ID}
        profilePicture={profilePicture}
        username={username!}
        usernameID={usernameID!}
        usernameWithUsernameID={usernameWithUsernameID!}
      />
      <div className="flex h-full w-full flex-col">
        {/* <HostingRooms /> */}
        {/* <PlayingRooms /> */}
      </div>
    </div>
  )
}
export default User
