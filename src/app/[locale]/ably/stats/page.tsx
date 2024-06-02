import * as Ably from 'ably'

const AblyStats = async () => {
  const realtime = new Ably.Realtime({
    key: 'Y8uQLg.3P7B8w:iNLbsDSoj6oL5S3v-psRHGHFu4Tx45kmTbS8TqDa3cI',
  })
  const resultPage = await realtime.stats({ unit: 'minute' })
  console.log(resultPage.items[0])

  return null
}

export default AblyStats
