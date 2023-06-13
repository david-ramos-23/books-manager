import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { isNonNullable } from '../utils/isNonNullable'
import { BookType } from '../models/book'
import { v4 } from 'uuid'

let books: BookType[] = []

export const getBooks: RequestHandler = async (req, res, next) => {
  /* @ts-ignore */
  const { userId: authenticatedUserId } = req.session

  try {
    isNonNullable(authenticatedUserId)

    const userBooks = books.filter(book => book.userId === authenticatedUserId)

    res.status(200).json(userBooks)
  } catch (error) {
    next(error)
  }
}

export const getBook: RequestHandler = async (req, res, next) => {
  const bookId = req.params.bookId
  /* @ts-ignore */
  const { userId: authenticatedUserId } = req.session

  try {
    isNonNullable(authenticatedUserId)

    const book = books.find(book => book.id === bookId)

    if (!book) {
      throw createHttpError(404, 'Book not found')
    }

    if (!book.userId === authenticatedUserId) {
      throw createHttpError(401, 'You cannot access this Book')
    }

    res.status(200).json(book)
  } catch (error) {
    next(error)
  }
}

interface CreateBookBody {
  author: string,
  description: string
  image: string;
  title: string,
}

export const saveBook: RequestHandler<unknown, unknown, CreateBookBody, unknown> = async (req, res, next) => {
  const { author, description, image, title } = req.body
  /* @ts-ignore */
  const { userId: authenticatedUserId } = req.session

  try {
    isNonNullable(authenticatedUserId)

    if (!title) {
      throw createHttpError(400, 'Book must have a title')
    }

    const newBook: BookType = {
      id: v4(),
      author,
      description,
      image,
      title,
      userId: authenticatedUserId
    }

    books.push(newBook)

    res.status(201).json(newBook)
  } catch (error) {
    next(error)
  }
}

interface UpdateBookParams {
    bookId: string,
}

interface UpdateBookBody {
  description?: string,
  title?: string,
}

export const updateBook: RequestHandler<UpdateBookParams, unknown, UpdateBookBody, unknown> = async (req, res, next) => {
  const { bookId } = req.params
  const updatedBook = req.body
  /* @ts-ignore */
  const { userId: authenticatedUserId } = req.session

  try {
    isNonNullable(authenticatedUserId)

    if (updatedBook === undefined) {
      throw createHttpError(400, 'Book must have a title or description')
    }

    const updatedBooks = books.map(book => book.id === bookId
      ? {
          ...book,
          ...updatedBook
        }
      : book)

    books = updatedBooks
    res.status(200).json(updatedBooks)
  } catch (error) {
    next(error)
  }
}

export const deleteBook: RequestHandler = async (req, res, next) => {
  const { bookId } = req.params
  /* @ts-ignore */
  const { userId: authenticatedUserId } = req.session

  try {
    isNonNullable(authenticatedUserId)

    const book = books.find(book => book.id === bookId)

    if (!book) {
      throw createHttpError(404, 'Book not found')
    }

    if (!book.userId === authenticatedUserId) {
      throw createHttpError(401, 'You cannot access this Book')
    }

    books = books.filter((book) => book.id !== req.params.id)

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
