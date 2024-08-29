import { Img } from './components/Img'

export const Player = ({
  ID,
  usernameWithUsernameID,
  profilePicture,
  coin,
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-1 rounded-l-full rounded-r-md bg-[#ffffff7c] p-1 shadow-[0_0px_10px_1px_rgba(255,255,255,0.5)]">
      <div className="flex flex-row gap-2">
        <Img ID={ID} src={profilePicture} />
        <div className="flex grow flex-row items-center justify-between gap-4 pr-2">
          <div className="text-white">{usernameWithUsernameID}</div>

          <div className="flex flex-row gap-2 drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-center rounded-full bg-yellow-400 p-1 text-white ">
              <div className="drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]">
                {coin}
              </div>
            </div>
            <div className="rounded-full bg-rose-400 p-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

type Props = {
  ID: string
  usernameWithUsernameID: string
  profilePicture: string | null
  coin: number
}
