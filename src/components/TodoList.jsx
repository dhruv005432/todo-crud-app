import TodoItem from './TodoItem';
import EmptyTodo from './EmptyTodo';

export default function TodoList({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
  filter,
  searchTerm,
  onResetFilters,
}) {
  if (todos.length === 0) {
    return (
      <EmptyTodo
        filter={filter}
        searchTerm={searchTerm}
        onResetFilters={onResetFilters}
      />
    );
  }

  return (
    <div className="todo-list-container">
      <div className="d-flex justify-content-between align-items-center mb-3 px-1">
        <h6 className="text-muted fw-semibold text-uppercase small mb-0">
          Showing {todos.length} {todos.length === 1 ? 'Task' : 'Tasks'}
        </h6>
      </div>

      <div className="todo-items">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
