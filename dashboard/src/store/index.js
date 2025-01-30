import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../store/reducers/adminAUth'

const store = configureStore({
  reducer: {
    login: loginReducer,
  }
})

export default store;