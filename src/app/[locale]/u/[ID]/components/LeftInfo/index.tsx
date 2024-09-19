import { UserPfp } from '@/components/UserPfp'
import { Item } from './components/Item'

export const LeftInfo = ({
  ID,
  profilePicture,
  username,
  usernameID,
  usernameWithUsernameID,
}: Props) => {
  return (
    <div className="flex w-[40rem] flex-col items-center gap-1 rounded-lg bg-[#00000025] p-2">
      <UserPfp
        ID={ID}
        src={profilePicture}
        className="size-14 shrink-0 rounded-full border-[0.4rem] border-[#ffffffae] bg-white"
        sizes="calc(1.15vw + 120px)"
        width={120}
        height={120}
        alt="pfp"
      />
      <div className="flex w-full flex-col gap-2 p-2">
        <Item keyValue={'ID:'} value={ID} />
        <Item
          keyValue={'username with username ID:'}
          value={usernameWithUsernameID}
        />
        <Item keyValue={'username:'} value={username} />
        <Item keyValue={'username ID:'} value={usernameID} />
      </div>
    </div>
  )
}

type Props = {
  ID: string
  profilePicture: string | null | undefined
  username: string
  usernameID: string
  usernameWithUsernameID: string
}
