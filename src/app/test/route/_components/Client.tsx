'use client'

import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useTimeout } from 'usehooks-ts'

const Client = () => {
  const router = useRouter()
  const link = useRef<any>()
  const [test, setTest] = useState<boolean>(false)

  useTimeout(() => link.current!.click(), 3000)

  const onClick1 = () => router.push('/push')

  const onClick2 = () => router.replace('/replace')

  // const clickBtn1 = () => btn1.current?.click()

  return (
    <div className="flex flex-col gap-2 p-2">
      {/* <button
        ref={btn1}
        onClick={onClick1}
        className="rounded-lg bg-orange-400 p-2"
      >
        Btn1 push
      </button> */}
      <button onClick={onClick2} className="rounded-lg bg-orange-400 p-2">
        Btn2 replace
      </button>
      {/* <button onClick={clickBtn1} className="rounded-lg bg-orange-400 p-2">
        Click Btn1
      </button> */}

      <Link ref={link} href="/push"></Link>
    </div>
  )
}

export default Client
