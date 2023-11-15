import Footer from '../_components/Footer'
import Header from '../_components/Header'
import Main from '../_components/Main'
const HowToPlay = () => {


  return (
    <div className="h-full w-full overflow-y-auto pt-10">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="h-full w-12 bg-gray-500"></div>
          <article className="flex w-full flex-col items-center">
            <Header text="How to play Painter's Cards" />
            <Main />
          </article>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default HowToPlay
