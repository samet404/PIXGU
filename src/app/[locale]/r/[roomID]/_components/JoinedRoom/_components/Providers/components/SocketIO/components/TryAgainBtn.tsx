
export const TryAgainBtn = () => {
    return (
        <button onMouseDown={() => {
            window.location.reload()
        }} className='rounded-md bg-[#ffffff2b] px-2 py-1'>

            Try again
        </button>
    )
}
