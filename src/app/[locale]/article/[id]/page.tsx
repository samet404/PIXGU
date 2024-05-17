import Footer from '../_components/Footer'
import Header from '../_components/Header'
import LeftSidebar from '../_components/LeftSidebar'
import RightSidebar from '../_components/RightSidebar'
import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'
import { api } from '@/trpc/server'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const Article = async ({ params }: Props) => {
  return (
    <div className="flex h-full w-full flex-row  bg-gradient-to-tr from-[#0d0d34] via-[#0d0d34] to-[#23236f]">
      <LeftSidebar />
      <div className="flex grow flex-row overflow-y-scroll">
        <div className="flex animate-fade-up flex-col gap-36 px-4 pt-11">
          <article className="flex grow flex-col items-center py-5">
            <Header text="How to play" />
            <main className="rounded-lg bg-gray-200 px-4 py-5 "></main>
          </article>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Article

type Props = { params: { id: string } }
