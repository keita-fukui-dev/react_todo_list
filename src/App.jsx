import { useState } from 'react'
import { TodoForm } from './components/TodoForm'
import { TodoCount } from './components/TodoCount'
import { TodoList } from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (text) => {
    const newTodo = { id: crypto.randomUUID(), text, completed: false }
    setTodos((prev) => [...prev, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <main className="app">
      <h1>ToDo List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoCount todos={todos} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </main>
  )
}

export default App
