const { PrismaClient } = require('@prisma/client')
const seedData = require('./seedData')

const prisma = new PrismaClient()

const setAutoIncrement = async (table) => {
  await prisma.$queryRaw`ALTER TABLE ${table} AUTO_INCREMENT = 1`
}

const load = async () => {
  for (const table in seedData) {
    const tableName = seedData[table]

    try {
      await setAutoIncrement(tableName)

      await prisma.user.deleteMany()
      console.log('Users deleted successfully!')

      await prisma.user.createMany({
        data: tableName,
      })
      console.log(tableName + `seeded successfully!`)
    } catch (e) {
      console.error('Error: Seeding failed at ' + tableName)
      console.error(e)
    }
  }

  await prisma.$disconnect()
}

load()
