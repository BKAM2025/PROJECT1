import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: false,
  error: null
};

export const getProductsByCategory = createAsyncThunk(
    "products/getProductsByCategory",
    async (categoryId, { rejectWithValue }) => {
      try {
        
        const response = await axios.get(`http://localhost:5000/api/product/getByCategoryId/${categoryId}`);
        
       
        
        if (!response.data.success) {
          return rejectWithValue(response.data.message);
        }
        
        return response.data.data || [];
      } catch (error) {
        console.error('Error details:', error);
        const errorMessage = error.response?.data?.error || 
                            error.response?.data?.message || 
                            error.message || 
                            'Failed to fetch products';
        return rejectWithValue(errorMessage);
      }
    }
  );

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;