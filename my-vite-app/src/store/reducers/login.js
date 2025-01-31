import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action for login
export const login = (mail, password) => async (dispatch) => {
  dispatch(loginRequest());
  
  try {
    const response = await axios.post("http://localhost:5000/api/user/login", { mail, password });
    const { user, token } = response.data; // Ensure token is extracted separately

    // Save token to localStorage
    localStorage.setItem("token", token);

    dispatch(loginSuccess({ user, token }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred during login. Please try again.";
    dispatch(loginFailure(errorMessage));
  }
};

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token"); // Ensure token is removed on logout
    },
  },
});

// Export actions
export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
