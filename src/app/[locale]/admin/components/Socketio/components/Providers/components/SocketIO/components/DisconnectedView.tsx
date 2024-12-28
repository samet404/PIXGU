export const DisconnectedView = ({ errors }: { errors: string[] }) => (
  <div className='flex h-full w-full flex-col items-center justify-center gap-6 rounded-lg text-white'>
    <div className='flex flex-col gap-1 items-center'>
      <div className="font-[700] text-[2.6rem]">
        {'Disconnected from server'}
      </div>
      <div className="text-[#ffffffcc] flex flex-row gap-1">
        <div className='text-white'>ERROR CODES: </div>
        <div>{errors.join(' | ') || 'REASON UNKNOWN'}</div>
      </div>
    </div>
  </div>
)