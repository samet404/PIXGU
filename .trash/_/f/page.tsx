import { api } from '@/trpc/server'
import Friend from './_components/Friend'
import User from './_components/User'

const Friends = async () => {
  const friends = await api.user.getFriends.query()

  console.log(friends)
  if (!friends)
    return (
      <div className="whitespace-pre-line text-white">{`You don't have friends
  -.-=__*-- (< ._.)>`}</div>
    )

  return (
    <section className="flex animate-fade flex-col gap-2 rounded-md bg-gradient-to-br from-[#0574d5] to-[#006cb3cd]  p-2 shadow-[0_0px_60px_5px_rgba(0,0,0,0.6)] xxs:w-full md:w-[27rem]">
      {friends.map((friend, index) => {
        if (friend)
          return (
            <User
              ID={friend.ID}
              name={friend?.usernameWithUsernameID}
              pfp={friend?.profilePicture}
              key={index}
            />
          )
      })}
    </section>
  )
}

export default Friends
