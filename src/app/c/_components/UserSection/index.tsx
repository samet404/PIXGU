import { api } from '@/src/trpc/server'
import User from './_components/User'
import { Pixelify_Sans } from 'next/font/google'

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['500'],
})

const UserSection = async () => {
  const friends = await api.user.getFriends.query()
  console.log('userSection rendered!')
  return (
    <section className="h-full w-[13rem] rounded-lg bg-[#ffffff57] p-2 shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]">
      {friends ? (
        friends.map((friend, index) => {
          if (friend)
            return (
              <User
                ID={friend.ID}
                name={friend.usernameWithUsernameID}
                pfp={friend.profilePicture}
                key={index}
              />
            )
        })
      ) : (
        <div className={`${pixelifySans.className} flex w-full items-center justify-center bg-[#ffff006e] shadow-[0_0px_10px_3px_rgba(0,0,0,0.1)] rounded-lg p-2 text-[#ffffffdb]`}>
          {"Looks like you don't have any friends yet to use here"}
        </div>
      )}
    </section>
  )
}
export default UserSection
