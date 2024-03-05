import { api } from '@/src/trpc/server'
import Link from 'next/link'
import { type ReactNode } from 'react'
import Image from 'next/image'
import { Interweave } from 'interweave'
import { notFound } from 'next/navigation'
import { polyfill } from 'interweave-ssr'

polyfill()

const Update = async ({ params }: { params: { v: string } }) => {
  const { v } = params

  const note = await api.announcement.getUpdateNoteByV.query(v)

  const transformText = (
    node: HTMLElement,
    children: ReactNode[],
  ): ReactNode => {
    switch (node.tagName.toLowerCase()) {
      case 'p':
        return (
          <p className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            {children}
          </p>
        )

      case 'b':
        return (
          <span className="rounded-md bg-[#ffff0062] px-1 selection:bg-[#2e7de5c4] selection:text-white lg:hover:bg-[#ffff0079]">
            {children}
          </span>
        )

      case 'h1':
        return (
          <h1 className="bg-gradient-to-r from-yellow-400 via-yellow-100 to-yellow-500 bg-clip-text py-10 font-[700] text-transparent">
            {children}
          </h1>
        )
      case 'h2':
        return <h2 className="py-8 font-[700]">{children}</h2>
      case 'h3':
        return <h3 className="py-6 font-[700]">{children}</h3>
      case 'h4':
        return <h4 className="py-4 font-[700]">{children}</h4>
      case 'h5':
        return <h5 className="text-yellow py-2 font-[700]">{children}</h5>
      case 'h6':
        return <h6 className="text-yellow py-1 font-[700]">{children}</h6>
      case 'li':
        return (
          <div
            className={`flex items-center gap-3 py-1 font-[400] ${node.getAttribute(
              'class',
            )}`}
          >
            <span className="h-[0.40rem] w-[0.40rem] rounded-full bg-yellow-400"></span>
            {children}
          </div>
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
      case 'div':
        return <div className={`${node.getAttribute('class')}`}>{children}</div>
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
    }
  }

  if (!note) return notFound()

  const createdAt = new Date(note.createdAt)
  const createdAtMinute =
    createdAt.getMinutes().toString().length === 1
      ? `0${createdAt.getMinutes()}`
      : createdAt.getMinutes()
  const formattedCreatedAt = `${createdAt.getDay()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAtMinute}:${createdAt.getMilliseconds()}`

  const updatedAt = new Date(note.updatedAt)
  const updatedAtMinute =
    updatedAt.getMinutes().toString().length === 1
      ? `0${updatedAt.getMinutes()}`
      : updatedAt.getMinutes()
  const formattedUpdatedAt = `${updatedAt.getDay()}/${updatedAt.getMonth() + 1}/${updatedAt.getFullYear()} ${updatedAt.getHours()}:${updatedAtMinute}:${updatedAt.getMilliseconds()}`

  note.text =
    `<h1>${note.IDAndVersion}</h1>
    <div class="text-sm">Created date: ${formattedCreatedAt}</div>
    <div class="text-sm">Updated date: ${formattedUpdatedAt}</div >
     ` + note.text

  return (
    <Interweave tagName="div" content={note.text} transform={transformText} />
  )
}
export default Update
