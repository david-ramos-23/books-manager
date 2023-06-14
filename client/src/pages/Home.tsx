import { NoAuthUser } from '@/components/NoAuthUser'
import { useAuth } from '@/context'
import { ROUTES } from '@/routes/types'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home(): ReactElement {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate(ROUTES.Books)
  }

  return <NoAuthUser />
}
