'use client'

import { redisDb } from '@/db/redis'
import { useAblyTokenClient } from '@/hooks/useAblyTokenClient'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useMyPeer } from '@/hooks/useMyPeer'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { type DataConnection } from 'peerjs'
import { useEffect, useRef } from 'react'
import { test } from './actions/test'

const Client = () => {
  const { myPeer } = useMyPeer({ secure: false })

  const conns = useRef<DataConnection[] | null>(null)
  const peerIDs = useRef<string[]>([])
  const myIDTextAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const otherIDTextAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const sendTextAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const sendButtonRef = useRef<HTMLButtonElement | null>(null)
  const videoContainerRef = useRef<HTMLDivElement | null>(null)
  const myScreenShareVideoRef = useRef<HTMLVideoElement | null>(null)
  const { ablyClient } = useAblyTokenClient()

  const ablyChannel = ablyClient.current.channels.get('test')

  ablyChannel.subscribe((msg) => {
    console.log(msg.data)
  })

  useEffect(() => {
    if (myScreenShareVideoRef.current && myPeer) {
      myScreenShareVideoRef.current.muted = true
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          console.log(stream.getVideoTracks())
          addVideoStream(myScreenShareVideoRef.current!, stream)

          myPeer.on('call', (call) => {
            call.answer(stream)
          })
        })
        .catch((e) => console.error(e))
    }
  }, [myPeer])

  if (!myPeer) return <div className="text-white">Loading...</div>

  subscribeAblyPresence(ablyChannel, 'leave', (msg) => {
    myPeer.disconnect()
  })

  // @ts-ignore
  myPeer.on('disconnected', () => test() as void)

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

      peerIDs.current.forEach((id) => {
        connectToNewUser(
          id,
          myScreenShareVideoRef.current!.srcObject as MediaStream,
        )
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

        peerIDs.current = peerIDs.current ? [...peerIDs.current, id] : [id]

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

  const addVideoStream = (video: HTMLVideoElement, stream: MediaStream) => {
    video.srcObject = stream
    video.onloadedmetadata = () => video.play()
  }

  const connectToNewUser = (peerID: string, stream: MediaStream) => {
    const call = myPeer.call(peerID, stream)

    const newVid = document.createElement('video')
    newVid.className = 'rounded-lg border-[0.2rem] border-[yellow]'
    videoContainerRef.current!.append(newVid)

    call.on('stream', (userVideoStream) => {
      addVideoStream(newVid, userVideoStream)
    })

    call.on('close', () => {
      newVid.remove()
      console.log('call closed')
    })
  }

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

      <div className="flex flex-col gap-5 p-5" ref={videoContainerRef}>
        <video
          className="rounded-lg border-[0.2rem] border-[yellow]"
          ref={myScreenShareVideoRef}
          src=""
        ></video>
      </div>
    </div>
  )
}

export default Client
