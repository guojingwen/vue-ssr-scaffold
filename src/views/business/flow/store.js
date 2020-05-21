import { createList, merge } from '../../../util'

const name = 'flow'
export const BOOKS = 'books'

export const flowModule = merge({
  name,
  namespaced: true,
}, createList({name: BOOKS, path: '/books.json'}))
