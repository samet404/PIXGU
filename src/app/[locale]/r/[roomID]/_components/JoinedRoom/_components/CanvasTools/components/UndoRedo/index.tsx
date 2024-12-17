import { TypeBtn } from './components/TypeBtn'

export const UndoRedo = () => {
    return <div className='flex flex-col gap-2'>
        <div className='text-[#ffffff7c] text-sm'>Undo/Redo Type</div>
        <div className='flex flex-row gap-2'>
            <TypeBtn type={0} />
            <TypeBtn type={1} />
        </div>
    </div>
}