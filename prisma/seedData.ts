// Seed data for the database

const seedData = {
  Rooms: [
    {
      name: 'room1',
      password: '1234',
      maxplayers: 4,
      admin: 'figenId',
      players: ['figenId'], 
    }
  ],
  Users: [
    {
      nickname: '404',
      preferences: {
        theme: 'default',
      },
      statistics: {},
      achievements: {},
    },
    {
      id: 'figenId',
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