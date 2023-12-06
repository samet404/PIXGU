// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const run = async () => {
  await prisma.Cutscene.create({
    data: {
      name: 'birth of the user',
      language: 'TR',
      texts: {
        createMany: {
          data: [
            {
              text: 'dasğodıaspodıjaspodjasp   nisi ut mollit ad ea voluptate tempor adipisicing Lorem nostrud labore ut Lorem.',
              position: 1,
            },
            {
              text: 'Dolor non ut minim laboris aliqua velit elit laborum Lorem esse veniam.',
              position: 4,
            },
          ],
        },
      },
    },
  })

  const cutscenes = await prisma.cutscene.findMany({
    include: {
      texts: true,
      images: true,
    },

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
