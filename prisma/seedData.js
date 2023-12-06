// Seed data for the database

const users = [
  {
    ipAddress: '192.168.1.1',
    nickname: '404',
    gender: 'girl',
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

const cutscene = {
  name: 'birth of user',
  language: 'TR',
  CutsceneStage: {
    createMany: {
      data: [
        {
          videoPath: '/videos/mp4/cars.mp4',
          imagePath: '/images/jpg/cutscene/birthOfUser/mountains.jpg',
          text: 'Synoon, biz canlıların kendini koruma içgüdüsü sayesinde vahşetiyle kendine çeken bu gezegen, işte maceran burada başlıyor. Bu gezegen kural falan tanımaz. Evrensel Televizyon yayınlarındaki yarışma programları yalnızca reytinge bakarlar. Ama günün sonunda yarışmayı kazananın eli boş dönmez. Bu yüzden bir çok canlı bu gezegende hayat mücadelesi veriyor. Açgözlü olmamak ve gerektiği anda geri çekilmek bu yarışmalara katılırkenki alınan riski anlamlı hale getirmenin tek yolu olabilir.',
        },
        {
          videoPath: null,
          imagePath: '/images/jpg/cutscene/walkingUser',
          text: 'Bu gezegene attığın her adım seni geri dönmek, yada dönmemek ikileminde bırakıyor. Ayrıca her adım seni ölüme daha da yakınlaştırıyor gibi hissettiriyor. Karmaşık duygular içerisindesin, tıpkı her gelen gibi. Ancak duygularının seni hedefinden şaşırtmasına izin vermiyorsun. Buraya <textInput id="userReason"></textInput> için geldin. Hedefini gerçekleştirmeden gidemezsin.'
        },
        {
          videoPath: null,
          imagePath: '/images/jpg/cutscene/shop',
          text: 'Uzun yürüyüşten sonra sonunda bir dükkan görüyorsun'
        }
      ],
    },
  },
}

module.exports = {
  users,
  articles,
  articleCategories,
  cutscene,
}
