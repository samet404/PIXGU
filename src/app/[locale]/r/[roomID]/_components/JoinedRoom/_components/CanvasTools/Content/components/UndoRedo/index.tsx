import { TypeBtn } from './components/TypeBtn'

export const UndoRedo = ({ heading, type0Text, type1Text }: Props) => {
    return <div className='flex flex-col gap-2'>
        <div className='text-[#ffffff7c] text-sm'>{heading}</div>
        <div className='flex flex-row gap-2'>
            <TypeBtn type={0} displayText={type0Text} />
            <TypeBtn type={1} displayText={type1Text} />
        </div>
    </div>
}

type Props = {
    heading: string
    type0Text: string
    type1Text: string
}