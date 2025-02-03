import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = (mail, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post("http://localhost:5000/api/admin/login", { mail, password })
    const admin = response.data;
    console.log("result", admin.token)
    dispatch(loginSuccess({ admin }));
    localStorage.setItem("token", admin.token);
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || error.message));
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
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;