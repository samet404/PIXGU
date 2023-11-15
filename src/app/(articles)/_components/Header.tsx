import Image, { type StaticImageData } from 'next/image'
import { type ComponentProps } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['900'],
})

type HeaderProps = {
  text: string
  img?: StaticImageData
  className?: string
} & ComponentProps<'header'>

const Header = ({ text, img, className, ...rest }: HeaderProps) => {
  return (
    <header className={`${className} flex flex-col gap-1 px-1 py-3`} {...rest}>
      {img && (
        <Image
          src={img}
          alt={`Header image for ${text}`}
          placeholder="blur"
          sizes="dasdak"
        />
      )}

      <div className={`${inter.className} text-2xl`}>{text}</div>
    </header>
  )
}

export default Header
