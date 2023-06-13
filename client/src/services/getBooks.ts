export const getBooks = async () => {
  const response = await fetch('/api/books')
  const books = await response.json()
  return books
}
