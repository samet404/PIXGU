import { Fragment } from 'react'

const Support = ({ params }: { params: { slug: string[] } }) => {
  setTimeout(() => console.log(params.slug), 3000)

  const content = () => {
    if (params.slug) {
        return params.slug.map((slug, index) => <div key={index}>{slug}</div>)
    }
    else {
        return <div>slug yok</div>
    }
  }
  return <Fragment>
    {content()}
  </Fragment>
}

export default Support
