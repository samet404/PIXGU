import Introduction from './Introduction.mdx'
import { archiveTimestamps } from '../_archive'
import Link from 'next/link'
import Template from '../_components/Template'


const Archive = () => {
    return (

        <Template>
            <Introduction />
            {archiveTimestamps.map((i) => <Link className='text-blue-100' key={i} href={`/privacy/archive/${i}`}>{new Date(parseInt(i)).toString()}</Link>)}
        </Template>
    )
}

export default Archive