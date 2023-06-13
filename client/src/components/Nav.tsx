import { Link } from 'react-router-dom'

export const Nav = () => {
  const imgUrl = import.meta.env.VITE_LOGO_URL

  return (
    <header className='sticky top-0 z-[1] mb-16 w-full bg-[#5D5E3Faa] p-2 font-medium backdrop-blur-sm sm:px-10'>
      <nav className='flex min-h-[50px] w-full items-center justify-between'>
        <Link to='/'>
          <img
            src={imgUrl}
            alt='logo'
            width={100}
            height={100}
            className='object-contain'
          />
        </Link>
        <div className='flex gap-5 '>
          <Link
            to='/book'
            className='text-[#FAEEE4] transition-colors duration-500 hover:text-[#d7ab6e]'
          >
            Add Book
          </Link>
          <Link
            to='/signup'
            className='text-[#FAEEE4] transition-colors duration-500 hover:text-[#d7ab6e]'
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  )
}
