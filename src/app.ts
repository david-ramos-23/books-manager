import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import booksRoutes from './routes/books'
import userRoutes from './routes/users'
// import session from 'express-session'
// import session from 'express-session'
// import { requiresAuth } from './middleware/auth'

const app = express()

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
// app.use(session({
//   secret: 'unsafe secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 60 * 60 * 1000
//   },
//   rolling: true
// }))

// Routes
app.use('/api/users', userRoutes)
app.use('/api/books', booksRoutes)

async function serveClient () {
  const path = await import('path')
  app.use(express.static('client/dist'))

  app.get('*', (req, res) => {
    console.log(path.resolve('client', 'dist', 'index.html'))
    res.sendFile(path.resolve('client', 'dist', 'index.html'))
  })
  return path
}

if (process.env.NODE_ENV === 'production') {
  serveClient()
}

export default app
