import { GeistSans } from 'geist/font/sans'

const Account = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) => {
  if (searchParams.page == 'account')
    return (
      <main className="z-0 flex h-full grow flex-col overflow-y-auto bg-gradient-to-tl from-[rgba(189,255,185,0.4)] via-[rgba(184,244,255,0.4)] to-[rgba(242,255,187,0.4)] p-2">
        <div className="h-full w-full animate-fade">
          <h1
            className={`${GeistSans.className} w-full rounded-md bg-slate-300 p-2 font-[900]`}
          >
            Account Settings
          </h1>
        </div>
      </main>
    )
}

export default Account
