export const getBrowserRTC = () => {
    if (typeof globalThis === 'undefined') return null
    const wrtc = {
        RTCPeerConnection: globalThis.RTCPeerConnection || globalThis.mozRTCPeerConnection ||
            globalThis.webkitRTCPeerConnection,
        RTCSessionDescription: globalThis.RTCSessionDescription ||
            globalThis.mozRTCSessionDescription || globalThis.webkitRTCSessionDescription,
        RTCIceCandidate: globalThis.RTCIceCandidate || globalThis.mozRTCIceCandidate ||
            globalThis.webkitRTCIceCandidate
    }
    if (!wrtc.RTCPeerConnection) return null
    return wrtc
}