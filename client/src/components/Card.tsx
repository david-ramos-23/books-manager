import { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <article className='mx-auto mt-12 flex flex-col items-center justify-center rounded-xl  bg-white p-8 sm:max-w-md sm:shadow-2xl'>
      {children}
    </article>
  )
}
