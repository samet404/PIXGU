import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'

// create the connection
const connection = connect({
  url: process.env.DATABASE_URL
})

// eslint-disable-next-line
const db = drizzle(connection)
