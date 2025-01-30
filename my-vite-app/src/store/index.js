import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "../store/reducers/user"
import loginReduce from '../store/reducers/login'
import productReducer from './reducers/product'
const store = configureStore({
  reducer: {
    //  counter:counterReducer,
    //  category:categoryReducer,
    login: loginReduce,
    user: UserReducer,
    product:productReducer


  }
})
export default store
// console.log("store",store)