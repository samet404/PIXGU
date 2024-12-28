import { ChangeBtn } from './components/ChangeBtn'

export const ChangeWsUrl = () => {
    return (
        <div className='flex flex-row'>
            <ChangeBtn wsUrl='wscanary.pixgu.com' />
            <ChangeBtn wsUrl='ws.pixgu.com' />
            <ChangeBtn wsUrl='ws2.pixgu.com' />
            <ChangeBtn wsUrl='localhost:5000' />
        </div>
    )
}