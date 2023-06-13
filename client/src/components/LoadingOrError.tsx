import type { ReactElement } from 'react'

interface Properties {
  error?: Error
}
export function LoadingOrError({ error }: Properties): ReactElement {
  return (
    <div className='flex items-center justify-center pt-10'>
      <h1 className='text-xl'>
        {error != null ? error.message : 'Loading...'}
      </h1>
    </div>
  )
}
