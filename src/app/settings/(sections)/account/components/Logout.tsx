import LuciaForm from '@/components/LuciaForm'
import { GeistSans } from 'geist/font/sans'

const Logout = () => {
  return (
    <LuciaForm action="/api/auth/logout" className="pt-20">
      <input
        className={`${GeistSans.className} rounded-md border-[0.2rem] border-[#ffffffb0] !bg-rose-500 px-2 py-1 font-[500] text-[rgba(255,255,255,0.64)] shadow-[0_0px_20px_-3px_rgba(255,0,0,0.5)] outline-white`}
        type="submit"
        value={'Log out'}
      />
    </LuciaForm>
  )
}

export default Logout
