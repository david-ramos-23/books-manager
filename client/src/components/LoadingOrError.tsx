import type { ReactElement } from 'react'

interface Properties {
  error?: Error
}
export function LoadingOrError({ error }: Properties): ReactElement {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <h1 className='text-xl' data-testid='LoadingOrError'>
        {error != null ? error.message : 'Loading...'}
      </h1>
    </div>
  )
}