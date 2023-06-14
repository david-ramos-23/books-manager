import { Link } from 'react-router-dom'

export const NoBooks = () => (
  <>
    <p>You don't have 📚 saved.</p>
    <p className='flex justify-between gap-x-2 text-sm'>
      Start adding one
      <Link to='/add' className='text-sky-500'>
        here!
      </Link>
    </p>
  </>
)
