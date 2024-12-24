import { Version } from './components/Version'
import { Shortcut } from './components/Shortcut'

export const RightBottom = () => {
    return (
        <div className='flex flex-row absolute items-end gap-2 bottom-0 right-0 pointer-events-none  z-[99]'>
            <Shortcut />
            <Version />
        </div>
    )
}