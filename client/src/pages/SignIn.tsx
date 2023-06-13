import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchemaForm } from '../../../src/schemas/auth'
import { useAuth } from '@/context/auth'
import { Card } from '@/components/Card'
import { Message } from '@/components/Message'
import { Label } from '@/components/Label'
import { Button } from '@/components'
import { SignInFormValues } from '@/types'

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(loginSchemaForm),
  })
  const { signIn, errors: loginErrors, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const onSubmit = (data: SignInFormValues) => signIn(data)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  return (
    <Card>
      {loginErrors.map((error, i) => (
        <Message
          message={error}
          key={i}
          className='mb-1 rounded-sm bg-red-500 px-3 py-2 text-sm text-slate-200'
        />
      ))}
      <h2 className='mg-5 text-xl font-bold'>Login</h2>

      <form className='flex w-full flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className='py-2'>
          <Label htmlFor='email'>Email</Label>
          <input
            aria-label='Write you email here....'
            placeholder='Write you email here...'
            className='w-full flex-1 rounded-[3px] border-[1px] border-slate-300 p-2 px-3 text-sm outline-0 transition duration-200 hover:border-[1px] hover:border-black'
            type='email'
            {...register('email', { required: true })}
          />

          {errors?.email?.message != null && (
            <Message
              message={errors?.email?.message}
              className='mt-1 rounded-[3px] bg-red-200  p-1 text-xs text-red-400'
            />
          )}
        </div>
        <div className='py-2'>
          <Label htmlFor='password'>Password</Label>
          <input
            type='password'
            placeholder='Write your password here...'
            className='w-full flex-1 rounded-[3px] border-[1px] border-slate-300 p-2 px-3 text-sm outline-0 transition duration-200 hover:border-[1px] hover:border-black'
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors?.password?.message != null && (
            <Message
              message={errors?.password?.message}
              className='mt-1 rounded-[3px] bg-red-200  p-1 text-xs text-red-400'
            />
          )}
        </div>
        <Button
          type='submit'
          className='my-2 rounded-[3px] border-[1px] border-slate-300 bg-slate-50 px-3 py-2 font-medium transition duration-200 hover:border-[1px] hover:border-black hover:bg-opacity-80'
        >
          Login
        </Button>
      </form>

      <p className='flex justify-between gap-x-2 text-sm'>
        Don't have an account?{' '}
        <Link to='/signup' className='text-sky-500'>
          Sign up
        </Link>
      </p>
    </Card>
  )
}
