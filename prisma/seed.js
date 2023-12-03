// seeding data to the database

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { users, articles, articleCategories, cutscenes } = require('./seedData')
// @ts-expect-error
const prisma = new PrismaClient()

const seedRooms = async () => {
  await prisma.room.deleteMany()
  console.log('Rooms deleted successfully! ✅ \n')
}

const seedUsers = async () => {
  await prisma.user.deleteMany()
  console.log('Users deleted successfully! ✅')

  await prisma.user.createMany({
    data: users,
  })
  console.log('Users seeded successfully! ✅ \n')
}

const seedArticles = async () => {
  await prisma.article.deleteMany()
  console.log('Articles deleted successfully! ✅')

  await prisma.article.createMany({
    data: articles,
  })
  console.log('Articles seeded successfully! ✅ \n')
}

const seedArticleCategories = async () => {
  await prisma.ArticleCategory.deleteMany()
  console.log('ArticleCategories deleted successfully! ✅')

  await prisma.ArticleCategory.createMany({
    data: articleCategories,
  })
  console.log('ArticleCategories seeded successfully! ✅ \n')
}

const seedCutscenes = async () => {
  await prisma.Cutscene.deleteMany()
  console.log('Cutscenes deleted successfully! ✅')

  await prisma.Cutscene.createMany({
    data: cutscenes,
    include: {
      texts: true,
    },
  })
  console.log('Cutscenes seeded successfully! ✅ \n')
}

const load = async () => {
  try {
    await seedRooms()
    await seedUsers()
    await seedArticles()
    await seedArticleCategories()
    await seedCutscenes()

    console.log('\n Seeding finished successfully! 🌟')
  } catch (e) {
    console.error('Error: Seeding failed 🔥 \n')
    console.error(e)
  } finally {
    await prisma.$disconnect()
  }
}

load()
