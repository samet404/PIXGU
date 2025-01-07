import { Btn } from './Btn'

export const Sounds = ({ text }: Props) => {
    return <Btn text={text} link={{ href: '/settings/sounds' }} className='bg-[#6cecea]' />
}

type Props = {
    text: string
}