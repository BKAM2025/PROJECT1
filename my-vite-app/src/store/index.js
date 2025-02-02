import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "../store/reducers/user"
import loginReduce from '../store/reducers/login'
import productReducer from './reducers/product'
import categoryReducer from './reducers/categories'
import productsReducer from './reducers/products'

const store = configureStore({
  reducer: {
    //  counter:counterReducer,
    //  category:categoryReducer,
    login: loginReduce,
    user: UserReducer,
    product:productReducer,
    categories:categoryReducer,
    products: productsReducer
  }
})
export default store

// console.log("store",store)