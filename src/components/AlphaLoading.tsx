import Spinner from './Spinner'

export const AlphaLoading = () => {
    return (
        <div className='absolute backdrop-blur-3xl top-0 left-0 w-full h-full flex items-center justify-center'>
            <Spinner />
        </div>
    )
}