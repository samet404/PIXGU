import { Section } from '../Section'
import { Content } from './Content'

export const GuestSection = ({ redirectToRoomID }: Props) => {
  return (
    <Section title="Log in as Guest">
      <div className='flex flex-col gap-4'>
        <div className="flex flex-col gap-2">
          <Content redirectToRoomID={redirectToRoomID} />
        </div>
        <div className="text-[0.8rem]">
          Guest accounts expire after 2 weeks of
          inactivity.
        </div>
      </div>
    </Section>
  )
}

type Props = {
  redirectToRoomID?: string
}