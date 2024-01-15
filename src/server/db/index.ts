import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'
import { env } from '@/env/server.mjs'

import * as articles from './schema/article'
import * as articleCategories from './schema/articleCategory'
import * as articlesToArticleCategories from './schema/articleToArticleCategory'

import * as auth from './schema/auth'

// create the connection
export const connection = connect({
  url: env.DATABASE_URL,
})

export const db = drizzle(connection, {
  schema: {
    ...articleCategories,
    ...articles,
    ...articlesToArticleCategories,
    ...auth,
  },
})
