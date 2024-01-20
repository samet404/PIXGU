import { user } from '@/schema/user'
import { db } from '@/db'
import { article } from '@/schema/article'

const Test = async () => {
  const createArticle = await db.insert(article).values({
    content: 'dpasıhdjp',
    headerText: 'dğasjdğsa',
  })

  console.log(createArticle.insertId + ' insertId')
  return <div>page</div>
}

export default Test