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
  [Pages.AddBook]: {
    component: lazy(
      async () =>
        await import('@/pages/AddOrEditBook').then((module) => ({
          default: module.AddOrEditBook,
        }))
    ),
    path: '/',
    title: 'Welcome',
  },
  [Pages.EditBook]: {
    component: lazy(
      async () =>
        await import('@/pages/AddOrEditBook').then((module) => ({
          default: module.AddOrEditBook,
        }))
    ),
    path: '/',
    title: 'Welcome',
  },
}

export default routes
