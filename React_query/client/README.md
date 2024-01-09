### React-Query

- if you are react developer there is no standard way of api calling in react so react-query standarize the way of the api call
- so what react-query basically do i will go some extra featuares what not there in react example: client side caching, error handling,Refetching the data, these features you will not get in react but you can use it using react-query
- previosuly it was react-query but in version4 they created one package called tanstack inside that one library react-query was there.
- first i have import QuertClientProvider, QueryClinet from React-Query Library in index.js
-     import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

- second i have create the new query client in index.js
-     const queryClient = new QueryClient()

- third i have to wrap QueryClinetProvider to App component in in index.js
-      <QueryClientProvider client={queryClient}>
           <App />
        </QueryClientProvider>

- now we are ready to use React-Query
- now will see how we can query(fetch) the data
- first i will have to import useQuery hook from react-query library so using this hook we fetch the api call in app.js
-     import { useQuery } from '@tanstack/react-query'
- we have to do object destructring of useQuery hook basically it has 2 parameters so first parameter is list of dependencies.second parameter is async callback function.inside this only we implement api calling
- now lets see dependeny list
- suppose i have written as [todo] using this key again i can retch the api data
-     const { data } = useQuery(
        ['todo'],
        async () => await (await fetch('http://localhost:8000/todo')).json()
        )

- now i have created Form.jsx and created one basic form and will see how we can form mutations
- first created createTodo function outside the form component it return the callback function inside that we write actullay todo api call
-         const createTodo = (text) => {
           return () =>
           fetch('http://localhost:8000/todo/create', {
            method: 'POST',
           headers: {
            'Content-Type': 'application/json',
           },
         body: JSON.stringify({ title: text }),
         })
        }
- inorder to create mutation we have useMutation hook so mutation means on server whichever thing you create or update is called as mutation
-     const todoMutatation = useMutation(createTodo(text), {
        onSuccess: () => {
         console.log('success')
         queryClient.invalidateQueries(['todo'])
        },
        onError: (error) => {
         console.log('error', error)
        },
        })
- finally you have to use useQueryClient hook for refetching any api specific query automatically
-      queryClient.invalidateQueries(['todo'])
