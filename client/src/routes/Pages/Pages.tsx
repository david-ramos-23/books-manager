import { Route, Routes } from 'react-router-dom'

import routes from '..'

export function Pages() {
  return (
    <Routes>
      {Object.values(routes).map(({ path, component: Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  )
}
