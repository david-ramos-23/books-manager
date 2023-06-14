import { useBooks } from '@/context/books'
import { Button } from './Button'
import { BookType } from '../../../src/models/book'
import { Card } from './Card'

export function TaskCard(book: BookType) {
  const { deleteBook } = useBooks()

  return (
    <Card>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>{book.title}</h1>
        <div className='flex items-center gap-x-2'>
          <Button onClick={() => deleteBook(book.id)}>Delete</Button>
        </div>
      </header>
      <p className='text-slate-300'>{book.description}</p>
      {/* format date */}
      <p>book.description</p>
    </Card>
  )
}
