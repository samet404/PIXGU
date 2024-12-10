import { DropdownBtn } from './DropdownBtn'
import { Main } from './Main'

export const Logs = () => {
    return (
        <div
            className="flex w-full animate-fade-blur flex-col gap-2 justify-start rounded-lg">
            <DropdownBtn />
            <Main />
        </div>
    )
}