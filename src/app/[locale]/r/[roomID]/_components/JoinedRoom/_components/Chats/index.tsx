import './styles/scrollbars.css'
import { GeneralChat } from './components/GeneralChat'
import { GuessChat } from './components/GuessChat'
import { Container } from './components/Container'
import { Change } from './components/Change'
import type { LangObj } from '../../lang'

export const Chats = ({ langObj }: Props) => {
  return (
    <Container>
      <Change />
      <GuessChat displayName={langObj.guessChat.displayName} />
      <GeneralChat displayName={langObj.generalChat.displayName} />
    </Container>
  )
}

type Props = {
  langObj: LangObj['chats']
}
