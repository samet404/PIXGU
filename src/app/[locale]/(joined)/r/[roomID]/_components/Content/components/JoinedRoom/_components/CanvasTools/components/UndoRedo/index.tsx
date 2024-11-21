import { Btn } from './components/Btn'
import { Shortcut } from './components/Shortcut'

export const UndoRedo = () => {
    return <div className='flex flex-col gap-1'>
        <div className='text-[#ffffff7c] text-sm'>Undo/Redo Type</div>
        <div className='flex flex-row gap-2'>
            <Btn type={0} />
            <Btn type={1} />
        </div>
        <Shortcut />
    </div>
}