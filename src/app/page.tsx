// import Link from "next/link";

// import { CreatePost } from "@/app/_components/create-post";
// import { getServerAuthSession } from "@/server/auth";
// import { api } from "@/trpc/server";

// export default async function Home() {
//   const hello = await api.post.hello.query({ text: "from tRPC" });
//   const session = await getServerAuthSession();

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
//       <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
//         <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//           Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
//         </h1>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//             href="https://create.t3.gg/en/usage/first-steps"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">First Steps →</h3>
//             <div className="text-lg">
//               Just the basics - Everything you need to know to set up your
//               database and authentication.
//             </div>
//           </Link>
//           <Link
//             className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
//             href="https://create.t3.gg/en/introduction"
//             target="_blank"
//           >
//             <h3 className="text-2xl font-bold">Documentation →</h3>
//             <div className="text-lg">
//               Learn more about Create T3 App, the libraries it uses, and how to
//               deploy it.
//             </div>
//           </Link>
//         </div>
//         <div className="flex flex-col items-center gap-2">
//           <p className="text-2xl text-white">
//             {hello ? hello.greeting : "Loading tRPC query..."}
//           </p>

//           <div className="flex flex-col items-center justify-center gap-4">
//             <p className="text-center text-2xl text-white">
//               {session && <span>Logged in as {session.user?.name}</span>}
//             </p>
//             <Link
//               href={session ? "/api/auth/signout" : "/api/auth/signin"}
//               className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
//             >
//               {session ? "Sign out" : "Sign in"}
//             </Link>
//           </div>
//         </div>

//         <CrudShowcase />
//       </div>
//     </main>
//   );
// }

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }

// react
import { Fragment } from 'react'
// next
import Image from 'next/image'
// components
import Logo from '@/png/logo.png'
import MainButton from './_components/MainButton'
import Link from 'next/link'
import Discord from '@/svg/Discord'
// images
import login from '@/png/login.png'
import questionmark from '@/png/questionmark.png'
import play from '@/png/play.png'
import createroom from '@/png/createroom.png'
import Twitter from '@/public/images/svg/Twitter'

const Home = () => {
    return (
        <Fragment>
            <main
                className={`flex h-full w-full flex-col items-center gap-3 overflow-y-auto bg-gray-900 py-[1rem]`}
            >
             
                <div className="flex animate-fade flex-col gap-4 p-4 animate-duration-1000">
                    <div className="flex w-full flex-row justify-between gap-1">
                        <Image
                            src={Logo}
                            alt="logo"
                            className="h-[auto] w-[6rem] select-none"
                            sizes="calc(2.33vw + 90px)"
                        ></Image>
                        <div className="flex flex-row items-center gap-2">
                            <Link href="discord.gg/falan">
                                <Discord
                                    width="2rem"
                                    height="2rem"
                                    color="rgba(255, 255, 255, 0.5)"
                                    className="hover:fill-[rgba(255,255,255,0.7)]"
                                />
                            </Link>

                            <Link href="a">
                                <Twitter
                                    width="2rem"
                                    height="2rem"
                                    color="rgba(255, 255, 255, 0.5)"
                                    className="hover:fill-[rgba(255,255,255,0.7)]"
                                />
                            </Link>
                        </div>
                    </div>
                    <div id='a' className=" h-min-[20rem] animate-[position_15s_ease-in-out_infinite] rounded-md   bg-gradient-to-tl from-[rgb(189,255,185)] via-[rgb(184,244,255)] to-[rgb(242,255,187)]  p-2">
                        <div className="grid h-full w-full gap-2 rounded-md bg-[rgba(0,0,0,0.7)] p-2 xs:grid-cols-1 md:grid-cols-2 md:grid-rows-2 ">
                            <MainButton
                                link="/join-room"
                                icon={
                                    <Image
                                        src={play}
                                        alt="play"
                                        className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
                                    />
                                }
                                name="Odaya katıl"
                                description="Odaya katıl ve oynamaya başla!"
                            />

                            <MainButton
                                link="/create-room"
                                icon={
                                    <Image
                                        className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
                                        src={createroom}
                                        alt="createroom"
                                    />
                                }
                                name="Oda oluştur"
                                description="Oda oluştur ve arkadaşlarını davet et!"
                            />

                            <MainButton
                                link="/how-to-play"
                                icon={
                                    <Image
                                        className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
                                        src={questionmark}
                                        alt="questionmark"
                                    />
                                }
                                name="Nasıl oynanır?"
                                description="Nasıl oynayacağını bilmiyor musun? Hemen öğren!"
                            />

                            <MainButton
                                link="/login"
                                icon={
                                    <Image
                                        className="h-[3rem] w-[3rem] opacity-30 drop-shadow-[0_0px_8px_rgba(0,0,0,0.7)]"
                                        src={login}
                                        alt="login"
                                    />
                                }
                                name="Giriş yap"
                                description="Hızlı bir şekilde giriş yapın ve devam edin."
                            />
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

export default Home


