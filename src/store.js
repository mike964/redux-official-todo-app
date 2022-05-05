import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'
import { configureStore } from '@reduxjs/toolkit'

// const rootReducer = combineReducers({
//   // Define a top-level state field named `todos`, handled by `todosReducer`
//   todos: todosReducer,
//   filters: filtersReducer
// })

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    todos: todosReducer,
    filters: filtersReducer,
  },
})

// For Testing
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about reducers' })
// store.dispatch({ type: 'todos/todoToggled', payload: 0 })
// store.dispatch({ type: 'todos/todoToggled', payload: 1 })
// store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' })
// store.dispatch({
//   type: 'filters/colorFilterChanged',
//   payload: { color: 'red', changeType: 'added' },
// })

export default store

/*
  - useSelector hook lets your React components read data from 
  the Redux store.
  useSelector accepts a single function, which we call a selector function. 
  A selector function takes the entire Redux store state as its argument, 
  reads some value from the state, and returns that result.

  - Only Global state that is needed across the app should go in the Redux store. 
  State that's only needed in one place should be kept in component state.
*/
