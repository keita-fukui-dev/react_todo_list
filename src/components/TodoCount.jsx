export function TodoCount({ todos }) {
  const completedCount = todos.filter((todo) => todo.completed).length
  const incompleteCount = todos.length - completedCount

  return (
    <p className="counts">
      全てのタスク：{todos.length} 完了済み：{completedCount} 未完了：
      {incompleteCount}
    </p>
  )
}
