const { Prisma } = require('@prisma/client')

const seedData = {
  Users: [
    {
      id: 1,
      nickname: '404',
      preferences: {
        theme: 'default',
      },
      statistics: {},
      achievements: {},
    },
    {
      id: 2,
      nickname: 'figen',
      preferences: {
        theme: 'red',
      },
      statistics: {},
      achievements: {},
    },
  ],
}

module.exports = {
  seedData,
}
