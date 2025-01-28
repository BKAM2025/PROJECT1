import { configureStore } from '@reduxjs/toolkit'
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'
import counterReducer from './reducers/counter'
import categoryReducer from "./reducers/categories"
export const store = configureStore({
  reducer: {
 counter:counterReducer,
 category:categoryReducer,
 auth: authReducer
  }
})
// console.log("store",store)