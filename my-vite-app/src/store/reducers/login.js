import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export const login = (mail, password) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_URL}/user/login`, { mail, password });
    const { user } = response.data;
    dispatch(loginSuccess({ user }));
    localStorage.setItem("token", response.data.user.token);
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred during login. Please try again.";
    dispatch(loginFailure(errorMessage));
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.user.token;
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
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;