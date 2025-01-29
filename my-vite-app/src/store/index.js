import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "../store/reducers/user"
const store = configureStore({
  reducer: {
 
 user:UserReducer,

  }
})
export default store
// console.log("store",store)