import { Item } from './components/Item'

export const Navbar = () => {
    return (
        <nav className='flex flex-row rounded-md bg-gradient-to-t from-[#ffffff50]  to-[#ffffffc2] backdrop-blur-sm shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]'>
            {(['Players', 'Canvas', 'Stats'] as const).map((name) => <Item key={name} name={name} />)}
        </nav>
    )

}

export type Item = 'Players' | 'Canvas' | 'Stats'