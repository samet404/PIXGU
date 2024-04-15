import { type ReactNode } from 'react'
import Footer from '../_components/Footer'
import Header from '../_components/Header'
import { Interweave } from 'interweave'

import Link from 'next/link'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { polyfill } from 'interweave-ssr'
import LeftSidebar from '../_components/LeftSidebar'
import RightSidebar from '../_components/RightSidebar'
import { api } from '@/trpc/server'
import z from 'zod'
import NotFound from '../../not-found'
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

polyfill()

const Article = async ({ params }: { params: { id: string } }) => {
  const transformText = (
    node: HTMLElement,
    children: ReactNode[],
  ): ReactNode => {
    switch (node.tagName.toLowerCase()) {
      case 'img': {
        const src = node.getAttribute('src')
        if (!src) throw new Error('src is not defined')

        const alt = node.getAttribute('alt')
        if (!alt) throw new Error('alt is not defined')

        const width = node.getAttribute('width')
        if (!width) throw new Error('width is not defined')

        const height = node.getAttribute('height')
        if (!height) throw new Error('height is not defined')

        return (
          <Image
            src={src}
            alt={alt}
            width={parseInt(width)}
            height={parseInt(height)}
            className="rounded-md"
          />
        )
      }
      case 'a':
        return (
          <Link
            className="text-blue-500 lg:hover:opacity-60"
            href={node.getAttribute('href')!}
          >
            {children}
          </Link>
        )

      case 'p':
        return <p>{children}</p>

      case 'b':
        return (
          <span className="rounded-md bg-[#ffff0086] px-1 selection:bg-[#2e7de5c4] selection:text-white lg:hover:bg-[#ffff00ce]">
            {children}
          </span>
        )

      case 'h4':
        return (
          <h4 className={`${inter.className} py-10 font-[700]`}>{children}</h4>
        )
      case 'h5':
        return (
          <h5 className={`${inter.className} text-yellow py-8 font-[700]`}>
            {children}
          </h5>
        )
      case 'h6':
        return (
          <h6 className={`${inter.className} text-yellow py-7 font-[600]`}>
            {children}
          </h6>
        )
      case 'li':
        return (
          <div
            className={`${
              inter.className
            } flex items-center gap-3 py-1 font-[400] ${node.getAttribute(
              'class',
            )}`}
          >
            <span className="h-[0.40rem] w-[0.40rem] rounded-full bg-black"></span>
            {children}
          </div>
        )
    }
  }

  const id = params.id

  const article = await api.article.getById.query(id)

  return article ? (
    <div className="flex h-full w-full flex-row  bg-gradient-to-tr from-[#0d0d34] via-[#0d0d34] to-[#23236f]">
      <LeftSidebar />
      <div className="flex grow flex-row overflow-y-scroll">
        <div className="flex animate-fade-up flex-col gap-36 px-4 pt-11">
          <article className="flex grow flex-col items-center py-5">
            <Header text="How to play" />
            <main className="rounded-lg bg-gray-200 px-4 py-5 ">
              <Interweave
                tagName="div"
                content={article.content}
                transform={transformText}
                className="text-black"
              />
            </main>
          </article>
          <Footer />
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  )
}

export default Article
