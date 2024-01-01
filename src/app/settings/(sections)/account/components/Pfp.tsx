import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

const Pfp = ({ profilePicture }: { profilePicture: string | null }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      {profilePicture ? (
        <Image
          className="h-20 w-20 select-none rounded-full bg-black shadow-[0_5px_20px_0px_rgba(0,0,0,0.25)]"
          src={profilePicture}
          width={120}
          height={120}
          sizes="calc(1.96vw + 75px)"
          alt="Profile Picture"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-400 shadow-[0_5px_20px_0px_rgba(0,0,0,0.25)]">
          <FontAwesomeIcon
            icon={faUser}
            color="rgba(255,255,255,0.7)"
            fontSize={55}
          />
        </div>
      )}

      <button
        className={`${inter.className} rounded-lg bg-[rgba(255,255,255,0.5)] p-2 font-[500] text-[rgba(0,0,0,0.5)] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.25)] outline-white`}
      >
        Change Pfp
      </button>
    </div>
  )
}

export default Pfp
