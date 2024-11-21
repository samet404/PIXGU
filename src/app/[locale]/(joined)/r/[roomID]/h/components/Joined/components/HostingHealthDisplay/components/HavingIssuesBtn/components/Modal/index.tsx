import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../atoms'
import { Outfit } from 'next/font/google'
import { Item } from './components/Item'
import { useOnClickOutside } from 'usehooks-ts'
import { useRef, type KeyboardEvent } from 'react'
import Content from './Content.mdx'

const outfit = Outfit({ subsets: ['latin'], weight: ['500', '600', '700'] })

export const Modal = () => {
  const setIsModalOpen = useSetAtom(isModalOpenAtom)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setIsModalOpen(false))

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false)
    }
  }

  return (
    <div
      style={{
        scrollbarWidth: 'thin',
        backgroundImage:
          'radial-gradient(at 80% 100%, hsla(328,86%,44%,1) 0px, transparent 50%),radial-gradient(at 11% 100%, hsla(328,86%,44%,1) 0px, transparent 50%)',
      }}
      className={`${outfit.className} overflow-y-scroll bg-[#000000d3] backdrop-blur-sm overflow-x-hidden absolute left-0 top-0 z-50 flex h h-full w-full pb-4 pt-20`}>
      <div
        onKeyUp={handleOnKeyDown}

        className='w-full h-full flex justify-center pt-7 px-2'
      >
        <div
          ref={ref}
          onKeyDown={handleOnKeyDown}
          className='animate-fade-up  w-full  h-full prose prose-headings:text-white prose-strong:text-white text-white'>
          <Content />
          <div className='pt-10'></div>
        </div>
      </div>
    </div>
  )
}


