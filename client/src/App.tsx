import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { LoadingOrError } from './components/LoadingOrError'
import { Pages } from './routes/Pages/Pages'

export function App(): ReactElement {
  const imgUrl = import.meta.env.VITE_LOGO_URL

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOrError />}>
        <img src={imgUrl} />
        <Pages />
      </Suspense>
    </BrowserRouter>
  )
}
