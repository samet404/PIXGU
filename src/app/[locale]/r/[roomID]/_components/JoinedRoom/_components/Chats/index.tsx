import { WinnersChat } from './components/WinnersChat'
import { GuessChat } from './components/GuessChat'
import { Container } from './components/Container'
import './styles/scrollbars.css'
import { Change } from './components/Change'

export const Chats = () => {
  return (
    <Container>
      <Change />
      <GuessChat />
      <WinnersChat />
    </Container>
  )
}
