// seeding data to the database

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Users } = require('./seedData')
// @ts-expect-error
const prisma = new PrismaClient()

const load = async () => {
  try {
    // Delete all data from the tables
    await prisma.user.deleteMany()
    console.log('Users deleted successfully!')

    // Add data to the tables
    await prisma.user.createMany({
      data: Users,
    })
    console.log('Users seeded successfully!')
  } catch (e) {
    console.error('Error: Seeding failed')
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
load()
