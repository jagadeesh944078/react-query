import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const createTodo = (text) => {
  return () =>
    fetch('http://localhost:8000/todo/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: text }),
    })
}

const Form = () => {
  const [text, setText] = useState('')
  const queryClient = new useQueryClient()

  const todoMutatation = useMutation(createTodo(text), {
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries(['todo'])
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={(e) => todoMutatation.mutate()}>create</button>
    </div>
  )
}

export default Form
