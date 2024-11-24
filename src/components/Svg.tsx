import type { ComponentProps } from 'react'
import Image from 'next/image'

export const Svg = ({ src, className, alt, ...rest }: Props) => <Image src={`/image/svg/${src}`} alt={alt} unoptimized={true} width={0} height={0} className={className} priority {...rest} />

type Props = ComponentProps<typeof Image>