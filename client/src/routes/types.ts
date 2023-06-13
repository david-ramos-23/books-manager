import { FC } from 'react'
import { PathRouteProps } from 'react-router-dom'

enum Pages {
  Home,
  SignUp,
  SignIn,
  AddBook,
  EditBook,
  NotFound,
}

interface PathRouteCustomProps {
  title?: string
  component: FC
}

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>

export { Pages }
export type { Routes }
