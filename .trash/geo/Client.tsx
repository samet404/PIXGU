import geoip from 'fast-geoip'

const Client = async () => {
  const ip = '207.97.227.239'

  console.log(await geoip.lookup(ip))

  return await geoip.lookup(ip)
}

export default Client
