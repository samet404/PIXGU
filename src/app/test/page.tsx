import Btn from './_components/Btn'
import Client from './_components/Client'

const Test = async () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 bg-white">
      <Client />

      <div
        style={{ overflowAnchor: 'revert' }}
        id="text"
        className="h-24 overflow-y-scroll"
      >
        {`    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum blanditiis
        non error quo at, nobis, iusto libero iure dolorum, excepturi odit
        debitis? Magnam ut saepe neque assumenda voluptate quis recusandae.lore
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
        voluptatibus, dignissimos provident hic molestias aperiam explicabo
        `}
        {` ducimus numquam asperiores dolor! Rem, perspiciatis hic praesentium unde
        illo voluptas quisquam blanditiis soluta! Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Animi praesentium voluptatum reiciendis
        soluta amet sequi quaerat architecto, beatae libero, dolor accusamus
        expedita earum. Excepturi alias consequatur mollitia voluptates natus
        ipsam.lore Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati earum atque ut neque officiis recusandae ea dolorum, aperiam
        quam. Voluptas magni ea dolores eius dolore laborum iusto quos explicabo
        itaque?`}
        <Btn />
        <div style={{ overflowAnchor: 'none' }} className='height-[1px] bg-yellow-300'></div>
      </div>
    </div>
  )
}

export default Test
