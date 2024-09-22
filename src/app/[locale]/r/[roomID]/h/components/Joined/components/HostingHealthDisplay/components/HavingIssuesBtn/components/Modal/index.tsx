import { useSetAtom } from 'jotai'
import { isModalOpenAtom } from '../../atoms'
import { Outfit } from 'next/font/google'
import { Item } from './components/Item'
import { useOnClickOutside } from 'usehooks-ts'
import { useRef, type KeyboardEvent } from 'react'

const inter = Outfit({ subsets: ['latin'], weight: ['500', '600', '700'] })

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
        backgroundImage:
          'radial-gradient(at 80% 100%, hsla(328,86%,44%,1) 0px, transparent 50%),radial-gradient(at 11% 100%, hsla(328,86%,44%,1) 0px, transparent 50%)',
      }}
      onKeyUp={handleOnKeyDown}
      className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center overflow-y-auto bg-[#0000005a] py-[20%] text-white backdrop-blur-lg selection:!bg-[#ffffffab] selection:text-blue-900"
    >
      <div
        onKeyDown={handleOnKeyDown}
        ref={ref}
        className={`${inter.className} shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]s flex animate-fade-up flex-col gap-10 rounded-lg border-[0.25rem] border-pink-600 bg-gradient-to-tr from-[#ffffffb4] via-[#ffffff7a] to-[#ffffffb4] px-6 py-4 text-center text-blue-950 xxs:w-[90%] md:w-[85%] lg:w-[80%]  `}
      >
        <Item
          title="Check your internet connection"
          description={[
            'Bad internet connection can cause issues with hosting',
          ]}
        />

        <Item
          title="Browser issues"
          description={[
            'If you are using firefox based browser your issue might be related to the browser. We are currently working on to fix firefox based problems. But now we recommend you using chromium based browsers like brave or chrome for player and host.',
            'Turn on hardware acceleration in your browser settings. This maybe solve your issues.',
            'Try to disable any extensions you have installed in your browser. Extensions can change website behavior.',
            `Don't use old browser versions. We recommend you to use latest version of your browser.`,
          ]}
        />

        <Item
          title="Firewall & Antivirus"
          description={[
            `Make sure your antivirus or firewall not blocking WebRTC or PIXGU`,
          ]}
        />
        <div className="text flex w-full flex-col justify-center rounded-lg bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 p-2 shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
          <div className="xxs:text-[1.4rem] lg:text-[1.8rem]">
            If you are still facing issues, please contact us
          </div>
        </div>
      </div>
    </div>
  )
}
