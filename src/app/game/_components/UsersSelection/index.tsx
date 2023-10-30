import User from './User'
import '../../_styles/scrollbars.css'

const UsersSection = () => {
    return (
        <div id="usersContainer" className="p-5">
            <div className="flex h-full w-[15rem] flex-col gap-2 overflow-y-scroll rounded-lg bg-gradient-to-b from-gray-300 to-blue-200 p-2 shadow-[0_0px_20px_5px_rgba(0,0,0,0.3)]">
                <User name={'John'} score={23} />
                <User name={'John'} score={3289} />
                <User name={'John'} score={7} />
                <User name={'John'} score={23} />
                <User name={'John'} score={23} />
                <User name={'John'} score={90} />
                <User name={'John'} score={12} />
                <User name={'John'} score={238} />
            </div>
        </div>
    )
}
export default UsersSection
