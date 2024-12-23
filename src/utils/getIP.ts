export const getIP = (headers: Headers) => {
    const FALLBACK_IP_ADDRESS = '0.0.0.0'
    const forwardedFor = headers.get('cf-connecting-ip')

    if (forwardedFor) return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS

    return headers.get('x-forwarded-for') ?? FALLBACK_IP_ADDRESS
}