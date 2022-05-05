import { client } from '../../api/client'

const initialState = []

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      // Can return just the new todos array - no extra object around it
      return [
        ...state,
        // {
        //   id: nextTodoId(state),
        //   text: action.payload,
        //   completed: false,
        // },
        action.payload,
      ]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }
        return {
          ...todo,
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    case 'todos/todosLoaded': {
      return action.payload
    }
    default:
      return state
  }
}

// * SELECTORS
//-----------------
// const selectTodos = state => state.todos

// Find out how many todos are currently marked as "completed":
const selectTotalCompletedTodos = (state) => {
  const completedTodos = state.todos.filter((todo) => todo.completed)
  return completedTodos.length
}

// Thunk function
export function fetchTodos() {
  return async function fetchTodosThunk(dispatch, getState) {
    const response = await client.get('/fakeApi/todos')
    dispatch(todosLoaded(response.todos))
  }
}
// Same thing as the above example! (but use arrow func)
/*
  export const fetchTodos = () => async dispatch => {
    const response = await client.get('/fakeApi/todos')
    dispatch(todosLoaded(response.todos))
  }
*/

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    // dispatch({ type: 'todos/todoAdded', payload: response.todo })
    dispatch(todoAdded(response.todo))
  }
}

// -------------------
// * ACTION CREATORS *
// -------------------
// - An action creator is a function that creates and returns an action object

export const todosLoaded = (todos) => {
  return {
    type: 'todos/todosLoaded',
    payload: todos,
  }
}

export const todoAdded = (todo) => {
  return {
    type: 'todos/todoAdded',
    payload: todo,
  }
}

export const colorFilterChanged = (color, changeType) => {
  return {
    type: 'filters/colorFilterChanged',
    payload: { color, changeType },
  }
}

/*
  Memoization is a kind of caching - specifically, saving the results of an 
  expensive calculation, and reusing those results if we see the same inputs later.

  Memoized selector functions are selectors that save the most recent result 
  value, and if you call them multiple times with the same inputs, will return 
  the same result value. If you call them with different inputs than last time, 
  they will recalculate a new result value, cache it, and return the new result.
*/
