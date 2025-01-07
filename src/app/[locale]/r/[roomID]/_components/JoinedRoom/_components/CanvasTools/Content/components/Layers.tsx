export const Layers = ({
    comingSoon,
    heading
}: Props) => {
    return (
        <div className='flex flex-row gap-2 items-start'>
            <div className='text-[#ffffff7c]'>{heading}</div>
            <div className='p-1 text-white text-xs shadow-[0_0px_10px_1px_rgba(234,179,8,0.5)] bg-yellow-500 rounded-md'>
                {comingSoon}
            </div>
        </div>
    )
}

type Props = {
    heading: string
    comingSoon: string
}