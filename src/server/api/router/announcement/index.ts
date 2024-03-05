import { createTRPCRouter } from '../../trpc'
import { getAllUpdateNotes, getUpdateNoteByV } from './subroutes/_routes'

export const announcementRouter = createTRPCRouter({
  getAllUpdateNotes: getAllUpdateNotes,
  getUpdateNoteByV: getUpdateNoteByV,
})
