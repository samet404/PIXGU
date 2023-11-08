// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const run = async () => {

  const rooms = await prisma.room.findMany()
  const users = await prisma.user.findMany()
  console.log(rooms)
  console.log(users)

}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
  })
