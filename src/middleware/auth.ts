import type { RequestHandler } from 'express'
import createHttpError from 'http-errors'

export const requiresAuth: RequestHandler = (req, res, next) => {
  /* @ts-ignore */
  if (req.session.userId) {
    next()
  } else {
    next(createHttpError(401, 'User not authenticated'))
  }
}
