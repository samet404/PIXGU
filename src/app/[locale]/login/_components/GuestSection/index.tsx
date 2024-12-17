import { Section } from '../Section'
import { Content } from './Content'

export const GuestSection = () => {
  return (
    <Section title="Login as Guest">
      <div className="flex flex-col gap-2">
        <Content />
      </div>
      <div className="text-[0.8rem]">
        Guest accounts expire after 2 weeks of
        inactivity.
      </div>
    </Section>
  )
}
