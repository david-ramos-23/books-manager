import type { UserType } from '../../../src/models/user'
import { fetchData } from './utils'

export async function getLoggedInUser(): Promise<UserType> {
  const response = await fetchData('/api/users', { method: 'GET' })
  return response.json()
}

export interface SignUpRequest {
  username: string
  email: string
  password: string
}

export async function signUp({
  username,
  email,
  password,
}: SignUpRequest): Promise<UserType> {
  const response = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })
  return response.json()
}

export interface LoginRequest {
  username: string
  password: string
}

export async function login({
  username,
  password,
}: LoginRequest): Promise<UserType> {
  const response = await fetchData('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  return response.json()
}

export async function logout() {
  await fetchData('/api/users/logout', { method: 'POST' })
}
