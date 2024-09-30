import {
  Fragment,
  Suspense,
  type ComponentProps,
  type MouseEvent,
  type PropsWithChildren,
} from 'react'
import dynamic from 'next/dynamic'
import { ButtonContent } from './components/ButtonContent'
import Spinner from '@/components/Spinner'

const ButtonLink = dynamic(() => import('./components/ButtonLink'))
const Button = dynamic(() => import('./components/Button'))

const MainButton = ({
  className,
  link,
  icon,
  name,
  description,
  keyName,
  children,
  onMouseDown,
  disabled = false,
  disabledDesc = null,
  ...rest
}: Props) => {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      {link ? (
        <ButtonLink className={className} href={link}>
          <ButtonContent name={name} description={description} icon={icon} />
          {children}
        </ButtonLink>
      ) : (
        <Button className={className} onMouseDown={onMouseDown}>
          <ButtonContent name={name} description={description} icon={icon} />
          {children}
        </Button>
      )}
    </Suspense>
  )
}

export default MainButton

type Props = PropsWithChildren<
  {
    className?: string
    link?: string
    icon: JSX.Element
    roundedClass?: `rounded-${string}-${string}` | null
    name: string
    description: string
    keyName: string
    disabled?: boolean
    disabledDesc?: string | null
    onMouseDown?: (
      e: MouseEvent,
      options: {
        cancelLoading: () => void
      },
    ) => void
  } & ComponentProps<'button'>
>
