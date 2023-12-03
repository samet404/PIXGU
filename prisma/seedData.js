// Seed data for the database

const users = [
  {
    ipAddress: '192.168.1.1',
    nickname: '404',
    preferences: {
      theme: 'default',
    },
    statistics: {},
    achievements: {},
  },
]

const articles = [
  {
    id: 'oppea8qbq1000hc96b1o4mk69',
    headerText: 'How to play',
    content: `
    <h4>loreeem abcdefg</h4>
    <p>Lorem ipsum dolor sit amet consectetur <a href="a">adipisicing</a> elit. <b>Cupiditate, veniam! Aut laboriosam neque porro!</b>   Saepe minima pariatur alias, sapiente, ullam quaerat vero, hic deleniti autem aspernatur repudiandae odit tempore dolorum?</p>
    <h5>loreeem</h5>
    <p>Lorem ipsum dolor sit amet consectetur <a href="a">adipisicing</a> elit. <b>Cupiditate, veniam! Aut laboriosam neque porro!</b>   Saepe minima pariatur alias, sapiente, ullam quaerat vero, hic deleniti autem aspernatur repudiandae odit tempore dolorum?</p>
    <h6>loreeem</h6>
    <p>Lorem ipsum dolor sit amet consectetur <a href="a">adipisicing</a> elit. <b>Cupiditate, veniam! Aut laboriosam neque porro!</b>   Saepe minima pariatur alias, sapiente, ullam quaerat vero, hic deleniti autem aspernatur repudiandae odit tempore dolorum?</p>
  
    
    <li>loerm afalan </li>
    <li>a4</li>
    <li>a4</li>
    <li>a4</li>
  
    <img src='/png/pfp.png' alt='pfp' width=200 height=200></img>
    `,
  },
]

const articleCategories = [
  {
    name: 'basics',
  },
  {
    name: 'tutorial',
  },
]

const cutscenes = [
  {
    name: 'birth of the user',
    language: 'TR',
    texts: {
      create: [
        {
          text: 'Deserunt nisi ut mollit ad ea voluptate tempor adipisicing Lorem nostrud labore ut Lorem.',
          position: 1
        }
      ],
    },
  },
]

module.exports = {
  users,
  articles,
  articleCategories,
  cutscenes
}
