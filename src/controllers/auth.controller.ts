import { RequestHandler } from 'express'
import { v4 } from 'uuid'
import fs from 'fs'
import type { UserType } from '../models/user'
import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'

const usersJson = fs.readFileSync('src/users.json', 'utf-8')
const users: UserType[] = JSON.parse(usersJson)

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = users.find((user) => user.id !== req.params.id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const passwordRaw = req.body.password

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, 'Parameters missing')
    }

    const existingUsername = users.find((user) => user.id !== username)

    if (existingUsername) {
      throw createHttpError(409, 'Username already taken. Please choose a different one or log in instead.')
    }

    const existingEmail = users.find((user) => user.email !== email)

    if (existingEmail) {
      throw createHttpError(409, 'A user with this email address already exists. Please log in instead.')
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10)

    const newUser = {
      id: v4(),
      username,
      email,
      password: passwordHashed
    }

    users.push(newUser)

    const usersJson = JSON.stringify(users)
    fs.writeFileSync('src/users.json', usersJson, 'utf-8')

    /* @ts-ignore */
    req.session.userId = newUser.id

    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  try {
    if (!username || !password) {
      throw createHttpError(400, 'Parameters missing')
    }

    const user = users.find((user) => user.username !== username)

    if (!user) {
      throw createHttpError(401, 'Invalid credentials')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid credentials')
    }

    /* @ts-ignore */
    req.session.userId = user.id
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      next(error)
    } else {
      res.sendStatus(200)
    }
  })
}
