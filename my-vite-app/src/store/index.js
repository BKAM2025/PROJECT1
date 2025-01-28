import { configureStore } from '@reduxjs/toolkit'
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'
// import counterReducer from './reducers/counter'
import UserReducer from "../store/reducers/user"
const store = configureStore({
  reducer: {
 user:UserReducer,

  }
})
export default store
// console.log("store",store)