import { useQuery } from '@tanstack/react-query'
import Form from './components/Form'

function App() {
  const { data, status, isFetching } = useQuery(
    ['todo'],
    async () => await (await fetch('http://localhost:8000/todo')).json()
  )

  if (isFetching) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <Form />
      <p>Status: {status}</p>
      {data &&
        data.data &&
        data.data.map((todo, index) => <li key={index}>{todo.title}</li>)}
    </div>
  )
}

export default App
