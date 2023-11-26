// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const run = async () => {
  await prisma.ArticleCategory.deleteMany()
}

run()
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
