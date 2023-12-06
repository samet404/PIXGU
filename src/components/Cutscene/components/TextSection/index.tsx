import { Inter } from 'next/font/google'
import TextDisplay from './components/TextDisplay'
const inter400 = Inter({
  subsets: ['latin'],
  weight: ['400'],
})

const TextSection = () => {
  console.log('Text section rendered')

  return (
    <section
      className={`${inter400.className} max-w-[90%] bg-[rgba(255,255,255,0.2)] p-2 text-sm text-[rgba(255,255,255,0.6)]`}
    >
      <TextDisplay />
    </section>
  )
}

export default TextSection
