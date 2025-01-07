export const GradientType = ({ comingSoon, heading }: Props) => {
    return (
        <div className='flex flex-row gap-2 items-start'>
            <div className='text-[#ffffff7c]'>{heading}</div>
            <div className='p-1 text-white text-xs bg-yellow-500 shadow-[0_0px_10px_1px_rgba(234,179,8,0.5)] rounded-md'>
                {comingSoon}
            </div>
        </div>
    )
}

type Props = {
    heading: string
    comingSoon: string
}