import * as articles from './schema/article'
import * as articleCategories from './schema/articleCategory'
import * as articlesToArticleCategories from './schema/articleToArticleCategory'

import * as auth from './schema/auth'

import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'

// create the connection
export const connection = connect({
  url: process.env.DATABASE_URL,
})

export const db = drizzle(connection, {
  schema: {
    ...articleCategories,
    ...articles,
    ...articlesToArticleCategories,
    ...auth,
  },
})
