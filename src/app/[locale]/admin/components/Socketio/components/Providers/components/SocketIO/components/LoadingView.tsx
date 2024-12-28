import Spinner from '@/components/Spinner';

export const LoadingView = () => (
    <div className="font-[700] w-full gap-3 h-full text-white items-center justify-center flex flex-col">
        <div>Connecting to server</div>
        <Spinner />
    </div>
)