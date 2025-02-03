import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  products: [],
  loading: false,
  error: '',
  filteredProducts: [],
};

// Fetch all products (API call)
export const filterProduct = createAsyncThunk(
    'product/getAll',
    async () => {
      try {
        const response = await axios.get(`${API_URL}/product/getAll`);
        return response.data; // Ensure you're returning the data here
      } catch (error) {
        return error.response.data.message
      }
    }
  );
  

const productSlice = createSlice({
  name: 'cool',
  initialState,
  reducers: {
    // This reducer will filter the products based on the query
    filterProductByQuery: (state, action) => {
     
        const query = action.payload.toLowerCase(); // Convert query to lowercase for case-insensitive search
        console.log("query",query)
      if (query) {
        state.filteredProducts = state.products.filter(product =>
          product.name.toLowerCase().includes(query) || // Assuming you're filtering by product name
          product.description.toLowerCase().includes(query) // You can add more fields to filter by
        );
      } else {
        state.filteredProducts = state.products; // If no query, show all products
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initially, filteredProducts will be the same as products
      })
      .addCase(filterProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { filterProductByQuery } = productSlice.actions;

export default productSlice.reducer;
