'use client'
import { useState } from 'react'

const Btn = () => {
  const [texts, setTexts] = useState<string[]>()

  return (
    <div
      onClick={() => {
        const textDiv = document.querySelector('#text')
        const newDiv = document.createElement('div')
        newDiv.style.height = '100px'
        newDiv.style.width = '100px'
        newDiv.style.backgroundColor = 'red'
        textDiv?.appendChild(newDiv)

        setTexts([
          'text1',
          'text2',
          'text3',
          'text4',
          'text5',
          'text6',
          'text7',
          'text8',
          'text9',
          'text10',
        ])
      }}
      className="bg-red-300"
    >
      Btn
      {texts?.map((text, index) => <div className="text-lg" key={index}>{text}</div>)}
    </div>
  )
}
export default Btn
