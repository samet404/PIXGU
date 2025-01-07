import type { LangObj } from '../../../../lang'
import { Item } from './components/Item'

export const Navbar = ({ langObj }: Props) => {
    const { players, canvas } = langObj

    return (
        <nav className='flex flex-row rounded-md bg-gradient-to-t from-[#ffffff50]  to-[#ffffffc2] backdrop-blur-sm shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]'>
            {(['Players', 'Canvas'] as const).map((name) => <Item key={name} name={name} displayText={name === 'Players' ? players : canvas} />)}
        </nav>
    )

}

export type Item = 'Players' | 'Canvas'

type Props = {
    langObj: LangObj['navbar']
}