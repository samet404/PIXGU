import type Peer from 'peerjs'
import { type DataConnection } from 'peerjs'
import { useRef, type MutableRefObject } from 'react'

type InputProps = {
  conns: MutableRefObject<DataConnection[] | null>
  myPeer: MutableRefObject<Peer>
}

const Input = ({ conns, myPeer }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOnInput = () => {
    console.log(conns.current)

    try {
      conns.current?.forEach((conn) => {
        conn.on('open', () => {
          console.log(inputRef.current?.value)
          conn.send(inputRef.current?.value)
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <input
      className="bg-white p-2"
      ref={inputRef}
      onInput={handleOnInput}
      type="text"
    />
  )
}
export default Input
