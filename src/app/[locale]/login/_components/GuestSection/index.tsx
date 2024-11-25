import { Section } from '../Section'
import { Content } from './Content'

export const GuestSection = () => {
  return (
    <Section title="Join us as guest">
      <div className="flex flex-col gap-2">
        <Content />
      </div>
      <div className="text-[0.8rem]">
        Guest accounts have limited features and expire after 2 weeks of
        inactivity.
      </div>
    </Section>
  )
}
