'use client'

import { useMyPeer } from '@/hooks/useMyPeer'
import { type DataConnection } from 'peerjs'
import { useRef } from 'react'

const Client = () => {
  const { myPeer } = useMyPeer({ secure: false })

  const conns = useRef<DataConnection[] | null>(null)
  const myIDTextAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const otherIDTextAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const sendTextAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const sendButtonRef = useRef<HTMLButtonElement | null>(null)

  if (!myPeer) return <div className="text-white">Loading...</div>

  const handleBtnSendClick = () => {
    try {
      const sendTxt = sendTextAreaRef.current?.value
      if (!sendTxt) throw new Error('Message is required')

      if (!conns.current) throw new Error('No connections')

      conns.current.forEach((conn) => {
        const date = new Date()
        console.log(
          `Sending data at ${date.getSeconds()}:${date.getMilliseconds()}`,
        )
        conn.send(sendTxt)
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleOnInput = () => {
    const otherIDs = otherIDTextAreaRef.current?.value.split(',')

    if (otherIDs) {
      otherIDs.forEach((id) => {
        const conn = myPeer.connect(id)

        conn.on('open', () => {
          console.log(`Connected to ${id}`)
          conns.current = conns.current ? [...conns.current, conn] : [conn]
        })
      })
    }
  }

  myPeer.on('connection', (connection) => {
    connection.on('data', (data: any) => {
      const date = new Date()
      console.log(
        `data: ${data.toString()} from ${connection.peer} at ${date.getSeconds()}:${date.getMilliseconds()}`,
      )
    })
  })

  myPeer.once('open', () => (myIDTextAreaRef.current!.value = myPeer.id))

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-scroll">
      <div className="flex flex-col">
        <div className="text-white">Your ID</div>
        <textarea ref={myIDTextAreaRef} cols={10} rows={5}></textarea>
      </div>

      <div className="flex flex-col">
        <div className="text-white">Other ID</div>
        <textarea
          onInput={handleOnInput}
          ref={otherIDTextAreaRef}
          cols={10}
          rows={5}
        ></textarea>
      </div>

      <div className="flex flex-col">
        <textarea ref={sendTextAreaRef} cols={10} rows={5}></textarea>
        <button
          onClick={handleBtnSendClick}
          ref={sendButtonRef}
          className="bg-yellow-300 active:bg-yellow-600"
          id="btn-send"
        >
          Send
        </button>
      </div>
    </div>
  )
}
export default Client
