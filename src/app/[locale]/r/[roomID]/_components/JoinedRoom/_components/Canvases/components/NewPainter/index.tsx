'use client'

import { User } from './components/User'
import { Timer } from './components/Timer'
import { useNewPainterPanel } from '@/zustand/store/useNewPainterPanel'
import { Fragment, useRef } from 'react'
import type { LangObj } from '../../../../lang'

export const NewPainter = ({ langObj }: Props) => {
  console.log('newPainterLangObj: ', langObj)
  const newPainterSfxRef = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/newPainter.mp3'),
  )

  const panelValues = useNewPainterPanel((s) => s.value)

  const content = (() => {
    if (!panelValues.isOpen) return

    switch (panelValues.status) {
      case 'waitingForThemes':
        newPainterSfxRef.current.play()
        return (
          <Fragment>
            <div className="absolute left-0 top-1 flex w-full animate-fade items-center justify-center text-[1rem] text-violet-500">
              {langObj.loading}
            </div>
            <User />
          </Fragment>
        )

      case 'selectingTheme':
        return (
          <Fragment>
            <Timer langObj={langObj.selectingThemeTimerDescs} />
            <User />
          </Fragment>
        )
    }
  })()

  if (panelValues.isOpen)
    return (
      <div
        style={{
          backgroundImage:
            'radial-gradient(at 100% 100%, hsla(261,87%,68%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(261,87%,68%,1) 0px, transparent 50%)',
        }}
        className={`absolute z-50 flex h-full w-full flex-col items-center justify-center rounded-[0.4rem] bg-white`}
      >
        {content}
      </div>
    )
}

type Props = {
  langObj: LangObj['canvases']
}
