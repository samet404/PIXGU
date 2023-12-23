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
    <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-4 bg-teal-400"></div>
          <div className="col-span-1 h-4 bg-teal-400"></div>
          <div className="col-span-2 h-4 bg-teal-400"></div>
          <div className="col-span-1 h-4 bg-teal-400"></div>
          <div className="col-span-1 h-4 bg-teal-400"></div>
          <div className="col-span-1 h-4 bg-teal-400"></div>
        </div>
  </Fragment>
}

export default Support
