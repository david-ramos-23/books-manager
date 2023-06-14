import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { protectedRoutes, routes } from '..'
import { useAuth } from '@/context'

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <h1>Loading...</h1>
  if (!isAuthenticated && !loading) return <Navigate to='/signin' replace />
  return <Outlet />
}

export function Pages() {
  return (
    <Routes>
      {Object.values(routes).map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route element={<ProtectedRoute />}>
        {Object.values(protectedRoutes).map(
          ({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          )
        )}
      </Route>
    </Routes>
  )
}
