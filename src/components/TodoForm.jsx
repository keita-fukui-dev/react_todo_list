import { useState } from 'react'

export function TodoForm({ onAdd }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    onAdd(text)
    setInput('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力"
      />
      <button type="submit">保存</button>
    </form>
  )
}
