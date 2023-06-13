import { ReactNode, createContext, useContext, useState } from 'react'
import {
  getBooks,
  deleteBook as deleteBookRequest,
  saveBook as saveBookRequest,
  updateBook as updateBookRequest,
} from '@/services/books'
import { BookType } from '../../../src/models/book'

interface BookContextInterface {
  books: BookType[]
  getAllBooks: () => void
  deleteBook: (id: string) => void
  saveBook: (book: BookType) => BookType
  updateBook: (id: string, book: BookType) => void
}

const BookContext = createContext<BookContextInterface | null>(null)

export const useBooks = () => {
  const context = useContext(BookContext)
  if (context == null)
    throw new Error('useBooks must be used within a BookProvider')
  return context
}

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<BookType[]>([])

  const getAllBooks = async () => {
    const books = await getBooks()
    setBooks(books)
  }

  const deleteBook = async (bookId: string) => {
    try {
      await deleteBookRequest(bookId)
      setBooks(books.filter((book) => book.id !== bookId))
    } catch (error) {
      console.error(error)
    }
  }

  const saveBook = async (book: BookType) => {
    try {
      return await saveBookRequest(book)
    } catch (error) {
      console.error(error)
    }
  }

  const updateBook = async (bookId: string, book: BookType) => {
    try {
      await updateBookRequest({ bookId, book })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <BookContext.Provider
      value={{
        books,
        getAllBooks,
        deleteBook,
        saveBook,
        updateBook,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}
