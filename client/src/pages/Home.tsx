import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import type { BookType } from '../../../src/models/book'
import { LoadingOrError } from '../components/LoadingOrError'
import { getBooks } from '../services/getBooks'

export function Home(): ReactElement {
  const { isLoading, isError, error, data } = useQuery<BookType[]>(
    ['books'],
    getBooks
  )
  if (isLoading || isError) {
    return <LoadingOrError error={error as Error} />
  }

  return (
    <>
      <div className='m-2 grid min-h-screen grid-cols-[minmax(0,384px)] place-content-center gap-2 md:m-0 md:grid-cols-[repeat(2,minmax(0,384px))] xl:grid-cols-[repeat(3,384px)]' />
      {data.map((book) => (
        <div
          key={book.id}
          className='flex flex-col items-center justify-center space-y-2 rounded bg-white p-2 shadow-md'
        >
          {book.title}
        </div>
      ))}
    </>
  )
}
