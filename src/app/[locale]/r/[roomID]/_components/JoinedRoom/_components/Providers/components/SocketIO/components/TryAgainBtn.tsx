
export const TryAgainBtn = ({ tryAgain }: Props) => {
    return (
        <button onMouseDown={() => {
            window.location.reload()
        }} className='rounded-md bg-[#ffffff2b] px-2 py-1'>

            Try again
        </button>
    )
}

type Props = {
    tryAgain: () => void
}