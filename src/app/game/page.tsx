import { Fragment } from 'react'
import CanvasSection from './_components/CanvasSection'
import UsersSection from './_components/UsersSelection'
import { Tilt_Neon, MuseoModerno } from 'next/font/google'

const tiltNeon = Tilt_Neon({ subsets: ['latin'] })
const museoModerno = MuseoModerno({ subsets: ['latin'], weight: '500' })
const Game = () => {
    return (

        <Fragment>
            <div className="flex h-full w-full animate-fade flex-row bg-[#3683e8] animate-once">
                <UsersSection />
                <div className="w-full overflow-y-scroll">
                    <div className="flex w-full flex-col gap-3 px-3 pb-[20rem] pt-5">
                        <CanvasSection />
                        <div className="flex w-full justify-center">
                            <div className="flex h-[30rem] w-full flex-row gap-2 rounded-lg  bg-gradient-to-b from-blue-200 to-indigo-100 p-2 shadow-[0_0px_10px_0px_rgba(0,0,0,0.3)] ">
                                <div className="flex w-[15rem] grow-0 flex-col items-center gap-2">
                                    <input
                                        type="text"
                                        className={`${museoModerno.className} h-[2rem] w-full rounded-md p-1 outline-none`}
                                    />
                                    <button
                                        className={`${museoModerno.className} flex h-[auto] w-full items-center justify-center rounded-lg border-[5px] border-solid border-[#e9c03c] bg-gradient-to-t from-yellow-200 to-yellow-300 p-1 text-[1.2rem] text-[rgba(0,0,0,0.3)]`}
                                    >
                                        SEND
                                    </button>
                                </div>
                                <div
                                    className={`${tiltNeon.className} flex grow flex-row gap-2`}
                                >
                                    <div className="flex h-full w-1/2 flex-col">
                                        <div className="w-full rounded-t-md bg-purple-600 text-center text-white">
                                            forecast chat
                                        </div>
                                        <div className="h-full w-full bg-gradient-to-b from-white to-transparent"></div>
                                    </div>

                                    <div className="flex h-full w-1/2 flex-col">
                                        <div className="w-full rounded-t-md bg-blue-600 text-center text-white">
                                            normal chat
                                        </div>
                                        <div className="h-full w-full bg-gradient-to-b from-white to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div></div>
        </Fragment>
    )
}

export default Game
