// Seed data for the database

const users = [
  {
    name: '404',
    gender: 'girl',
    preferences: {
      theme: 'default',
    },
    statistics: {},
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
  CutsceneStages: {
    createMany: {
      data: [
        {
          videoPath: null,
          imagePath: '/images/jpg/cutscene/birthOfUser/mountains.jpg',
          text: 'Synoon, biz canlıların kendini koruma içgüdüsü sayesinde, vahşetiyle kendine çeken bu gezegen, işte maceran burada başlıyor. Bu gezegen kural falan tanımaz. Evrensel Televizyon yayınları için reyting mekanı desek yeridir. Yüzlerce yarışma ve program burada düzenlenir. Ama günün sonunda yarışmayı kazananın eli boş dönmez. Bu yüzden bir çok canlı bu gezegende şansını denemeye geliyor.',
        },
        {
          videoPath: null,
          imagePath: '/images/jpg/cutscene/birthOfUser/walkingUser.jpg',
          text: 'Amacın bu yarışmalardan birine katılıp kazanmak. Gezegeninden ayrılalı 1 ışıkyılı yol yürüdün. Awttığın her adım seni geri dönmek, yada dönmemek ikileminde bırakıyor. Ayrıca her adım seni ölüme daha da yakınlaştırıyor gibi hissettiriyor. Karmaşık duygular içerisindesin, tıpkı her gelen gibi. Ancak duygularının seni hedefinden şaşırtmasına izin vermiyorsun. Buraya <textinput id={`userReason`}></textinput> için geldin. Hedefini gerçekleştirmeden gidemezsin.',
        },
        {
          videoPath: null,
          imagePath: '/images/jpg/cutscene/birthOfUser/shop.jpg',
          text: 'Uzun yürüyüşten sonra sonunda bir dükkan görüyorsun seni karşılıyor. Dükkanın önünde bir tabela var. Üzerinde "Kazanmak için önce kaybetmelisin" yazıyor. Dükkanın içerisine giriyorsun. İçeride bir çok eşya var. Ancak bunların hepsi senin için gereksiz. Çünkü senin tek ihtiyacın olanı biliyorsun. Kazanmak için <textinput id={`userItem`}></textinput>ye ihtiyacın var. Eşyanı alıp yola koyuluyorsun.',
        },
        {
          videoPath: null,
          imagePath: null,
          text: 'Dükkanın sahibi dikkatini çekmişti. Garip gözüküyordu, sanki buradan değil gibi. Seni ilk gördüğü andan itibaren sana karşı bir ilgisi olduğu belliydi. Sebebini umursamadan uzaklaşıyorsun.',
        },

        {
          videoPath: null,
          imagePath: null,
          text: `Gördüğün tabelanın üzerindeki kağıdı çıkarken almıştın. Üzerinde bir çok yarışmadan birinin ilanı vardı. Hangisine gideceğine kafa yormadın fazla zaman yoktu. Dikkatini "Painter's Cards" adında bir yarışma çekmişti. Yola koyuldun. İyi şanslar yolcu.`,
        },
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
