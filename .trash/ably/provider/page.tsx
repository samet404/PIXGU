import dynamic from 'next/dynamic'

const AblyProviderWrapper = dynamic(
  () => import('./_components/AblyProviderWrapper'),
  { ssr: false },
)

const Client = dynamic(() => import('./_components/Client'), { ssr: false })

const Page = () => {
  return (
    <AblyProviderWrapper>
      <Client />
    </AblyProviderWrapper>
  )
}
export default Page
