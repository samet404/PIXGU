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

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

polyfill()

const Article = ({ params }: { params: { headerText: string } }) => {
  const transformText = (
    node: HTMLElement,
    children: ReactNode[],
  ): ReactNode => {
    switch (node.tagName.toLowerCase()) {
      case 'img':
        return (
          <Image
            src={node.getAttribute('src')!}
            alt={node.getAttribute('alt')!}
            width={node.getAttribute('width')! as any}
            height={node.getAttribute('height')! as any}
            className="rounded-md"
          />
        )

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
        return <p className="">{children}</p>

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
            className={`${inter.className} flex items-center gap-3 py-1 font-[400]`}
          >
            <span className="h-[0.40rem] w-[0.40rem] rounded-full bg-black"></span>
            {children}
          </div>
        )
    }
  }

  const articleContent = `
  <h4>loreeem abcdefg</h4>
  <p>Lorem ipsum dolor sit amet consectetur <a href="a">adipisicing</a> elit. <b>Cupiditate, veniam! Aut laboriosam neque porro!</b>   Saepe minima pariatur alias, sapiente, ullam quaerat vero, hic deleniti autem aspernatur repudiandae odit tempore dolorum?</p>
  <h5>loreeem</h5>
  <p>Lorem ipsum dolor sit amet consectetur <a href="a">adipisicing</a> elit. <b>Cupiditate, veniam! Aut laboriosam neque porro!</b>   Saepe minima pariatur alias, sapiente, ullam quaerat vero, hic deleniti autem aspernatur repudiandae odit tempore dolorum?</p>
  <h6>loreeem</h6>
  <p>Lorem ipsum dolor sit amet consectetur <a href="a">adipisicing</a> elit. <b>Cupiditate, veniam! Aut laboriosam neque porro!</b>   Saepe minima pariatur alias, sapiente, ullam quaerat vero, hic deleniti autem aspernatur repudiandae odit tempore dolorum?</p>

  
  <li>loerm afalan </li>
  <li>a4</li>
  <li>a4</li>
  <li>a4</li>

  <img src='/png/pfp.png' alt='pfp' width=200 height=200></img>

    
  `

  return (
    <div className="flex h-full w-full flex-row  bg-gradient-to-tr from-[#0d0d34] via-[#0d0d34] to-[#23236f]">
      <LeftSidebar />
      <div className="flex flex-row overflow-y-scroll">
        <div className="flex animate-fade-up flex-col gap-36 px-4 pt-11">
          <article className="flex grow flex-col items-center py-5">
            <Header text="How to play" />
            <main className="rounded-lg bg-gray-200 px-4 py-5 ">
              <Interweave
                content={articleContent}
                transform={transformText}
                className="text-black"
              />
            </main>
          </article>
          <Footer />
        </div>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Article
