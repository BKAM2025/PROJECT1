import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/adminAUth'; // Ensure this path is correct
import UserReducer from './reducers/user';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: UserReducer,
  },
});

export default store;
