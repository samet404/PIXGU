import geoip from 'fast-geoip'

const getGeo = async () => {
  const ip = '207.97.227.239'
  const geo = await geoip.lookup(ip)
  return geo
}

const Geo = async () => {
  const geo = await getGeo()
  console.log('geo', geo)

  return <div>{JSON.stringify(geo)}</div>
}

export default Geo
