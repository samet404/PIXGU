import { Outfit } from 'next/font/google'
import { Btn } from './components/Btn'
import { Timer } from './components/Timer'
import { useSelectThemePanel } from '@/zustand/store'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700', '900'],
})

export const SelectTheme = () => {
  const panelValues = useSelectThemePanel((s) => s.value)

  if (panelValues.isOpen && panelValues.status === 'selectingTheme')
    return (
      <Timer>
        <section
          className={`${outfit.className} z-30  flex h-full w-full animate-fade select-none items-center justify-center rounded-md bg-white animate-duration-200`}
        >
          <Btn theme={panelValues.themes[0]} position={1} />
          <Btn theme={panelValues.themes[1]} position={2} />
        </section>
      </Timer>
    )

  if (panelValues.isOpen && panelValues.status === 'waitingForThemes')
    return (
      <section
        className={`${outfit.className} absolute z-30  flex h-full w-full animate-fade select-none items-center justify-center rounded-md bg-white animate-duration-200`}
      >
        <div className="text-[1.4rem] text-violet-500">
          Waiting host for themes...
        </div>
      </section>
    )
}
