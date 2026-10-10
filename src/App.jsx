import { useState } from 'react'
import './App.css'

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    setEditText(todo.text)
    setIsEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const text = editText.trim()
    if (!text) return
    onUpdate(todo.id, text)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('本当によろしいですか？')) {
      onDelete(todo.id)
    }
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSave}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button type="submit">保存</button>
        </form>
      ) : (
        <>
          <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
            {todo.text}
          </span>
          <button type="button" onClick={handleEdit}>
            編集
          </button>
        </>
      )}
      <button type="button" onClick={handleDelete}>
        削除
      </button>
    </li>
  )
}

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  const completedCount = todos.filter((todo) => todo.completed).length
  const incompleteCount = todos.length - completedCount

  const handleAdd = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: crypto.randomUUID(), text, completed: false }])
    setInput('')
  }

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleUpdate = (id, text) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="app">
      <h1>ToDo List</h1>

      <form className="add-form" onSubmit={handleAdd}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タスクを入力"
        />
        <button type="submit">保存</button>
      </form>

      <p className="counts">
        全てのタスク：{todos.length} 完了済み：{completedCount} 未完了：
        {incompleteCount}
      </p>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </main>
  )
}

export default App
