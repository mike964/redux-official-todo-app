import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import { print1, print2, print3 } from './exampleAddons/middleware'

const composedEnhancer = composeWithDevTools(
  // Add whatever middleware you actually want to use here
  applyMiddleware(thunkMiddleware)
  // other store enhancers if any
)

const store = createStore(rootReducer, composedEnhancer)

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
