import { useEffect } from "react"

function App() {

  useEffect(() => {
    fetch('/api/users/login', {
      method: 'POST',
    }).then((res) => res.json()).then((data) => {
      console.log(data)
    })  
  }, [])
  
	return <div>App</div>
}

export default App
