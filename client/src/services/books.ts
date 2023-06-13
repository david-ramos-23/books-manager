import type { BookType } from '../../../src/models/book'
import { fetchData } from './utils'

export async function fetchNotes(): Promise<BookType[]> {
  const response = await fetchData('/api/books', { method: 'GET' })
  return response.json()
}

interface SaveBookRequest {
  author: string
  description: string
  image: string
  title: string
}

export async function saveBook({
  author,
  description,
  image,
  title,
}: SaveBookRequest): Promise<BookType> {
  const response = await fetchData('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ author, description, image, title }),
  })
  return response.json()
}

interface UpdateBookRequest {
  bookId: string
  book: BookType
}

export async function updateBook({
  bookId,
  book,
}: UpdateBookRequest): Promise<BookType> {
  const response = await fetchData(`/api/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
  return response.json()
}

export async function deleteNote(bookId: string) {
  await fetchData(`/api/books/${bookId}`, { method: 'DELETE' })
}
