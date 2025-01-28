import { configureStore } from '@reduxjs/toolkit'
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'
// import counterReducer from './reducers/counter'
import UserReducer from "../store/reducers/user"
const store = configureStore({
  reducer: {
 counter:counterReducer,
 category:categoryReducer,
 auth: authReducer,
 user:UserReducer,

  }
})
export default store
// console.log("store",store)