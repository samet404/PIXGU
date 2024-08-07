'use client'

import { useSetAtom } from 'jotai'
import { useSignals, useEnters, useMyLeave } from './hooks'
import { hostingHealth } from '../../atoms'

const ConnectToPeers = () => {
  const setHostingHealth = useSetAtom(hostingHealth)
  /*
  Proccess of WebRTC peer connection:
    
    1- New user enters the room (useEnters)
    2- Host sends an offer to the user (useEnters)
    3- New user gets the offer and sends an answer to host (useOffers)
    4- Host gets signals (useSignals)
    5- Connection is established or failed
      If failed, the user is removed from the peers list  
    6- if other user leaves the room, the user is removed from the peers list
  */

  useSignals()
  useEnters()
  useMyLeave()
  setHostingHealth({
    isErr: false,
    isLoading: false,
    isSuccess: true,
    msg: 'Everything is ready, hosting room now',
  })

  return null
}

export default ConnectToPeers
