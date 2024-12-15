export type RTCStats = {
    id: string;
    timestamp: DOMHighResTimeStamp
} &
    (
        ({ type: 'candidate-pair' } & RTCCandidatePairStats)
        |
        ({ type: 'certificate' } & RTCCertificateStats)
        |
        ({ type: 'data-channel' } & RTCDataChannelStats)
        |
        ({ type: 'local-candidate' } & RTCLocalCandidateStats)
        |
        ({ type: 'remote-candidate' } & RTCRemoteCandidateStats)
        |
        ({ type: 'transport' } & RTCTransportStats)
        |
        ({ type: 'peer-connection' } & RTCPeerConnectionStats)
    )

export type RTCTransportStats = {
    bytesReceived: number,
    bytesSent: number,
    dtlsCipher: string,
    dtlsRole: string,
    dtlsState: string,
    iceLocalUsernameFragment: string,
    iceRole: string,
    iceState: string,
    localCertificateId: string,
    packetsReceived: number,
    packetsSent: number,
    remoteCertificateId: string
    selectedCandidatePairChanges: number,
    selectedCandidatePairId: string
    srtpCipher: string
    tlsVersion: string
}

export type RTCCandidatePairStats = {
    bytesDiscardedOnSend: number
    bytesReceived: number
    bytesSent: number
    consentRequestsSent: number
    currentRoundTripTime: number
    lastPacketReceivedTimestamp: number
    lastPacketSentTimestamp: number
    localCandidateId: string
    nominated: boolean
    packetsDiscardedOnSend: number
    packetsReceived: number
    packetsSent: number
    priority: number
    remoteCandidateId: string
    requestsReceived: number
    requestsSent: number
    responsesReceived: number
    responsesSent: number
    state: string
    totalRoundTripTime: number
    transportId: string
    writable: boolean
}

export type RTCCertificateStats = {
    base64Certificate: string
    fingerprint: string
    fingerprintAlgorithm: string
}

export type RTCDataChannelStats = {
    bytesReceived: number;
    bytesSent: number;
    dataChannelIdentifier: number;
    label: string;
    messagesReceived: number;
    messagesSent: number;
    protocol: string;
    state: string;
}

export type RTCLocalCandidateStats = {
    address: string
    candidateType: string
    foundation: string
    ip: string,
    isRemote: boolean,
    networkType: any
    port: number
    priority: number,
    protocol: string,
    transportId: string,
    usernameFragment: string
}

export type RTCRemoteCandidateStats = {
    address: string
    candidateType: string
    foundation: string
    ip: string,
    isRemote: boolean,
    port: number
    priority: number,
    protocol: string,
    transportId: string,
    usernameFragment: string
}


export type RTCPeerConnectionStats = {
    dataChannelsClosed: number,
    dataChannelsOpened: number
}