type contentP = Array<{
  text: string
  images: string[]
}>

type MainProps = {
  content?: {
    lang: string

    h3: Array<{
      text: string
      images: string[]
      p?: contentP
      ul: Array<string[]>
    }>

    h4: Array<{
      text: string
      images: string[]
      p?: contentP
      ul: Array<string[]>
    }>

  }
}

const Main = ({ content }: MainProps) => {
  return (
    <main>
      <h3>accusantium explicabo? Numquam, consequuntur quaerat?</h3>
      <h4>dsaj</h4>
      <h5>lopjdops</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime aperiam
        molestias ut minima, odit explicabo doloremque eius dolorem minus
        tempora illo suscipit. Doloribus, quam aperiam neque ex consequatur
        ipsum pariatur?
      </p>
    </main>
  )
}

export default Main
