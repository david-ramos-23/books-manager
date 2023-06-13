import { lazy } from 'react'
import { Pages, Routes } from './types'

const routes: Routes = {
  [Pages.Home]: {
    component: lazy(
      async () =>
        await import('@/pages/Home').then((module) => ({
          default: module.Home,
        }))
    ),
    path: '/',
    title: 'Welcome',
  },
  [Pages.SignUp]: {
    component: lazy(
      async () =>
        await import('@/pages/SignUp').then((module) => ({
          default: module.SignUp,
        }))
    ),
    path: '/signup',
    title: 'User SignUp',
  },
  [Pages.SignIn]: {
    component: lazy(
      async () =>
        await import('@/pages/SignIn').then((module) => ({
          default: module.SignIn,
        }))
    ),
    path: '/signin',
    title: 'User Login',
  },
  [Pages.AddBook]: {
    component: lazy(
      async () =>
        await import('@/pages/AddOrEditBook').then((module) => ({
          default: module.AddOrEditBook,
        }))
    ),
    path: '/add',
    title: 'Add Book',
  },
  [Pages.EditBook]: {
    component: lazy(
      async () =>
        await import('@/pages/AddOrEditBook').then((module) => ({
          default: module.AddOrEditBook,
        }))
    ),
    path: '/edit/:id',
    title: 'Edit Book',
  },
}

export default routes
