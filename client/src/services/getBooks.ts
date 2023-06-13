import { BookType } from '../../../src/models/book'

export const getBooks = async (): Promise<BookType[]> => {
  return await fetch(`/api/books/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    if (!res.ok) {
      throw Error(`Error HTTP: ${res.status}`, { cause: res.status })
    }

    return await res.json()
  })
}
