import { Btn } from './components/Btn'
import { Timer } from './components/Timer'
import { useSelectThemePanel } from '@/zustand/store'

export const SelectTheme = () => {
  const panelValues = useSelectThemePanel((s) => s.value)

  if (panelValues.isOpen && panelValues.status === 'selectingTheme')
    return (
      <Timer>
        <section
          style={{
            backgroundColor: 'hsla(0,0%,100%,1)',
            backgroundImage:
              'radial-gradient(at 100% 100%, hsla(261,87%,68%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(261,87%,68%,1) 0px, transparent 50%)',
          }}
          className={`relative z-30 flex h-full w-full  animate-fade select-none flex-col items-center justify-center rounded-md bg-white shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] animate-duration-200`}
        >
          <div className="flex w-full items-center justify-center rounded-[0.4rem] bg-violet-200 p-5 text-center text-[1.4rem] text-violet-500 shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)]">
            Choose your theme
          </div>
          <div className="flex h-full w-full flex-row items-center p-5">
            <Btn theme={panelValues.themes[0]} position={1} />
            <Btn theme={panelValues.themes[1]} position={2} />
          </div>
        </section>
      </Timer>
    )

  if (panelValues.isOpen && panelValues.status === 'waitingForThemes')
    return (
      <section
        style={{
          backgroundColor: 'hsla(0,0%,100%,1)',
          backgroundImage:
            'radial-gradient(at 100% 100%, hsla(261,87%,68%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(261,87%,68%,1) 0px, transparent 50%)',
        }}
        className={`absolute z-30 flex  h-full w-full animate-fade select-none items-center justify-center rounded-md bg-white shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] animate-duration-200`}
      >
        <div className="text-[1.4rem] text-violet-500">
          Waiting host for themes...
        </div>
      </section>
    )
}
