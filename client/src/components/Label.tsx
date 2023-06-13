export function Label({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className='my-1 block text-xs text-slate-400'>
      {children}
    </label>
  )
}
