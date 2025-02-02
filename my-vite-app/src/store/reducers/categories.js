import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  loading: false,
  error: null
};

export const getCategories = createAsyncThunk(
    "categories/getCategories", 
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/getAll");
        return response.data.data; // Assuming your successful response has a data property
      } catch (error) {
        // Extract the specific database error if it exists
        const dbError = error.response?.data?.error;
        const errorMessage = dbError || error.response?.data?.message || 'Failed to fetch categories';
        console.error('Category fetch error:', errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;