export function Message({ message }: { message: string }) {
  return (
    <p className='mb-1 rounded-sm bg-red-500 px-3 py-2 text-sm text-slate-200'>
      {message}
    </p>
  )
}
