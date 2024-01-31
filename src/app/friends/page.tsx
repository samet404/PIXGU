import { api } from '@/src/trpc/server'
import Friend from './_components/Friend'

const Friends = async () => {
  const friends = await api.user.getFriends.query()

  const a = [2, 2, 2]

  const friendsComponents = friends.map((friend) => {
    if (!friend) throw new Error('Error when iterating friends')
    if (!friend.id || !friend.username)
      throw new Error('Error when iterating friends')

    return <Friend name={friend.username} key={friend.id} pfp="d" />
  })

  return (
    <section className="flex animate-fade flex-col gap-2 rounded-md bg-gradient-to-br from-[#0574d5] to-[#006cb3cd]  p-2 shadow-[0_0px_60px_5px_rgba(0,0,0,0.6)] xxs:w-full md:w-[27rem]">
      {!friendsComponents ? (
        friendsComponents
      ) : (
        <div className="whitespace-pre-line text-white">{`You don't have friends
        -.-=__*-- (< ._.)>`}</div>
      )}
    </section>
  )
}

export default Friends
