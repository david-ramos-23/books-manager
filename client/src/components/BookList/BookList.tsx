import { BookType } from '../../../../src/models/book'

export const BookList = ({ books }: { books: BookType[] }) => {
  return (
    <div className='m-2 grid min-h-screen grid-cols-[minmax(0,384px)] place-content-center gap-2 md:m-0 md:grid-cols-[repeat(2,minmax(0,384px))] xl:grid-cols-[repeat(3,384px)]'>
      {books.map((book) => (
        <div
          key={book.id}
          className='flex flex-col items-center justify-center space-y-2 rounded bg-white p-2 shadow-md'
        >
          {book.title}
        </div>
      ))}
    </div>
  )
}
