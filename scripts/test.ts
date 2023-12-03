// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const run = async () => {
  await prisma.cutscene.create({
    data: {
      name: 'birth of the user',
      language: 'TR',
      images: {
        create: [
          {
            path: '/lorem/ipsum',
            position: 1,
          },
        ],
      },
    },
  })

  const cutscenes = await prisma.cutscene.findMany({
    include: {
      images: true
    }

    // kyle' ın videosunu izle komple
  })
  console.log(cutscenes)

}

run()
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
