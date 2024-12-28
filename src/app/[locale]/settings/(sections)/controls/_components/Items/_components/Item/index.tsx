import { BindBtn } from './_components/BindBtn'

export const Item = ({ name, displayName }: Props) => {
    return (
        <div className="flex flex-row gap-5 text-sm items-center bg-[#ffffff39] rounded-md pl-3 py-1 pr-1 shadow-md">
            <div className='text-[#000000b4] '>
                {displayName}
            </div>

            <BindBtn name={name} />
        </div>
    )
}

type Props = {
    name: string
    displayName: string
}