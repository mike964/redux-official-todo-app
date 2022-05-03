import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import TodoListItem from './TodoListItem'

// const selectTodos = (state) => state.todos
const selectTodoIds = (state) => state.todos.map((todo) => todo.id)

const TodoList = () => {
  // const todos = useSelector(selectTodos)
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  const renderedListItems =
    // todos.map((todo) => {
    todoIds.map((todoId) => {
      // return <TodoListItem key={todo.id} todo={todo} />
      return <TodoListItem key={todoId} id={todoId} />
    })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
