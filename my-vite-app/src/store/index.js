import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "../store/reducers/user"
import loginReduce from '../store/reducers/login'
const store = configureStore({
  reducer: {
    //  counter:counterReducer,
    //  category:categoryReducer,
    login: loginReduce,
    user: UserReducer,


  }
})
export default store
// console.log("store",store)