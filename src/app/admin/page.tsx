"use client"

import { Socketio } from './components/Socketio'

const Admin = () => {
    return (
        <div className='flex h-full w-full flex-col items-center '>
            <Socketio />
        </div>
    )
}

export default Admin