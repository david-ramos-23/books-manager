import app from './app'
import { PORT } from './config'

async function main () {
  await app.listen(PORT)
  console.log('Server on port', PORT)
}

main()
