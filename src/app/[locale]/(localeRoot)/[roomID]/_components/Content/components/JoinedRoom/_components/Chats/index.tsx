import { WinnersChat } from './components/WinnersChat'
import { GuessChat } from './components/GuessChat'
import { Container } from './components/Container'
import './styles/scrollbars.css'

export const Chats = () => {
  return (
    <Container>
      <GuessChat />
      <WinnersChat />
    </Container>
  )
}
