import { configureStore } from '@reduxjs/toolkit'
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'
// import counterReducer from './reducers/counter'
import authReducer from "../store/reducers/adminAUth"


const store = configureStore({
  reducer: {
    loginAdmin: authReducer,
  }
})
export default store
// console.log("store",store)