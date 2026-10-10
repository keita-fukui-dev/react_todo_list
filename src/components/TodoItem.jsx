import { useState } from 'react'

export function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
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
