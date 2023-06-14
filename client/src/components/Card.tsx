import { ReactNode } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <article className='mx-auto mt-12 flex w-full scale-100 cursor-pointer flex-col items-center justify-center rounded-xl bg-white p-8 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#5d5e3f23] sm:min-w-fit sm:max-w-md'>
      {children}
    </article>
  )
}
