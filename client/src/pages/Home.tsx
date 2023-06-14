import { NoAuthUser } from '@/components/NoAuthUser'
import { NoBooks } from '@/components/NoBooks'
import { useAuth } from '@/context'
import { useQuery } from '@tanstack/react-query'
import type { ReactElement } from 'react'
import type { BookType } from '../../../src/models/book'
import { LoadingOrError } from '../components/LoadingOrError'
import { getBooks } from '../services/getBooks'
import { BookList } from '@/components/BookList/BookList'

export function Home(): ReactElement {
  const { isAuthenticated } = useAuth()

  const { isLoading, isError, error, data } = useQuery<BookType[]>({
    queryKey: ['books'],
    queryFn: getBooks,
    enabled: isAuthenticated,
    retry: false,
  })

  if (!isAuthenticated) {
    return <NoAuthUser />
  }

  if (isLoading || isError) {
    return <LoadingOrError error={error as Error} />
  }

  return <>{data.length === 0 ? <NoBooks /> : <BookList books={data} />}</>
}
