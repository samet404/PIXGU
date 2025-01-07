import { Btn } from './Btn'

export const Controls = ({ text }: Props) => {
    return (
        <Btn text={text} link={{ href: '/settings/controls' }} className='bg-teal-300' />
    )
}

type Props = {
    text: string
}