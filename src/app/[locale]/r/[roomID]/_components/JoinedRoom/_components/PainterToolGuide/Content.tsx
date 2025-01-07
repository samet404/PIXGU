export const Content = ({ text }: Props) => {

    return (
        <div style={{
            backgroundImage: 'radial-gradient(at 0% 0%, hsla(303, 82%, 45%, 1) 0px, transparent 50%),radial-gradient(at 50% 0%, hsla(303, 82%, 45%, 1) 0px, transparent 50%),radial-gradient(at 0% 100%, hsla(303, 82%, 45%, 1) 0px, transparent 50%),radial-gradient(at 50% 100%, hsla(303, 82%, 45%, 1) 0px, transparent 50%)',
        }} className='text-white p-1 absolute h-full pointer-events-none z-30 w-[30rem] flex items-center pl-3 animate-fade-blur'>
            <div className='w-[20rem]'>
                {text}
            </div>
        </div>
    )
}

type Props = {
    text: string
}