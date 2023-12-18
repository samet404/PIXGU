import { getProviders } from 'next-auth/react'
import ProviderButton from './components/ProviderButton'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
})

const OAuthSection = async () => {
  const providers = await getProviders()

  return (
    <section
      className={`${inter.className} justify-left flex w-full animate-fade-up flex-col gap-2 rounded-md  bg-[rgba(255,255,255,0.3)] px-2 pb-2 pt-2 font-[400] text-[rgba(255,255,255,0.7)]`}
    >
      <div className="pl-1 font-[500]">Join us without password</div>
      <div className="grid w-full grid-cols-5 gap-3 rounded-md bg-[rgba(0,0,0,0.1)] p-[0.40rem] shadow-[0_0px_20px_5px_rgba(255,255,255,0.3)]">
        {Object.values(providers!).map((provider) => (
          <ProviderButton
            key={provider.name}
            name={provider.name}
            id={provider.id}
          />
        ))}
      </div>
    </section>
  )
}

export default OAuthSection
