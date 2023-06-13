import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import type { BookType } from '../../../src/models/book'
import { LoadingOrError } from '../components/LoadingOrError'
import { getBooks } from '../services/getBooks'
import { useAuth } from '@/context'
import { Link } from 'react-router-dom'

export function Home(): ReactElement {
  const { isAuthenticated } = useAuth()

  const { isLoading, isError, error, data } = useQuery<BookType[]>({
    queryKey: ['books'],
    queryFn: getBooks,
    enabled: isAuthenticated,
    retry: false,
  })

  if (!isAuthenticated) {
    return (
      <section className='py-16'>
        Please
        <span className='mx-1'>
          <Link
            to='/signin'
            className='transition-color text-sky-500 duration-500 hover:text-sky-600'
          >
            Sign in
          </Link>
        </span>
        to see your notes
      </section>
    )
  }

  if (isLoading || isError) {
    return <LoadingOrError error={error as Error} />
  }

  return (
    <>
      {data.length === 0 ? (
        <>
          <p>You don't have 📚 saved.</p>
          <p>start adding one here!.</p>
        </>
      ) : (
        <div className='m-2 grid min-h-screen grid-cols-[minmax(0,384px)] place-content-center gap-2 md:m-0 md:grid-cols-[repeat(2,minmax(0,384px))] xl:grid-cols-[repeat(3,384px)]'>
          {data.map((book) => (
            <div
              key={book.id}
              className='flex flex-col items-center justify-center space-y-2 rounded bg-white p-2 shadow-md'
            >
              {book.title}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
