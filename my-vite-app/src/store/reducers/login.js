import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const login = (mail, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post("http://localhost:5000/api/user/login", { mail, password });
    const { user } = response.data;


    dispatch(loginSuccess({ user }));
    localStorage.setItem("token", response.data.user.token)
    navigate("/home")
    if (response.data && response.data.error) {
      setError("Account not found or incorrect password");
      return; }
}
catch (error) {
  // Handle errors like network failure or server issues
  setError("An error occurred. Please try again later.");
  
}
}


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
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;