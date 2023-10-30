"use client"

import Modal from '@/components/Modal'
import Image from 'next/image'
import { useRouter } from 'next/navigation' 
// nextjs/fonts
import { MuseoModerno } from 'next/font/google'
// images
import Logo from '@/png/logo.png'
import dangerouslyGoogleLogo from '@/png/google-logo.png'
import { useClickAway } from '@uidotdev/usehooks'

const museoModerno = MuseoModerno({ subsets: ['latin'] })

const Login = () => {
    const router = useRouter()

    const ref = useClickAway<HTMLDivElement>(() => router.back() )

    return (
        <Modal>
            <div
                ref={ref}
                className="flex h-full w-[20rem] animate-fade-right flex-col items-center overflow-y-auto bg-[rgba(255,255,255,0.2)] px-1 pb-1 pt-4 shadow-[0_0px_80px_10px_rgba(0,0,0,0.8)] backdrop-blur-md animate-duration-[300ms] animate-once "
            >
                <Image
                    src={Logo}
                    alt="logo"
                    className="h-[auto] w-[5rem] drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
                    sizes="calc(1.96vw + 75px)"
                ></Image>
                <div
                    className={`${museoModerno.className} py-5 text-[2rem] text-white drop-shadow-[0_0px_2px_rgba(0,0,0,1)]`}
                >
                    Join us
                </div>
                <div className="flex w-full flex-col items-center gap-1">
                    <div
                        className={`${museoModerno.className} py-5 text-[1rem] text-white drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]`}
                    >
                        Guest Login
                    </div>
                    <input
                        className={`drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)] ${museoModerno.className} w-[90%] rounded-sm border-none p-1 outline-none`}
                        placeholder="Nickname"
                        type="text"
                    />
                </div>
                <div className="flex w-full flex-col items-center gap-1">
                    <div
                        className={`${museoModerno.className} py-5 text-[1rem] text-white`}
                    >
                        - Or -
                    </div>
                    <button
                        className={`${museoModerno.className} flex w-[90%] flex-row items-center gap-3 rounded-md border-none bg-black p-2 text-white outline-none drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)] `}
                    >
                        <Image
                            src={dangerouslyGoogleLogo}
                            alt="googleLogo"
                            className="w-[1.2rem]"
                            quality={40}
                            sizes="calc(0.48vw + 18px)"
                        ></Image>
                        <div className=" text-[rgba(255,255,255,0.7)]">
                            Continue with Google
                        </div>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default Login
