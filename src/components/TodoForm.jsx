import { useState } from 'react'

export function TodoForm({ onAdd }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) {
      setError('文字を入力してください')
      return
    }
    onAdd(text)
    setInput('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setError('')
        }}
        placeholder="タスクを入力"
      />
      <button type="submit">保存</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}
