// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const initialState = {
//     categories: [],
//     loading: false,
//     error:null
//   };
//   export const getCategories = createAsyncThunk("categories/getCategories", async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/category/getAll");
//       return response.data;
//     } catch (error) {
//       return error.response.data.message;
//     }
//   });

//   const categorySlice=createSlice({
//     name: "categories",
//     initialState,
//     extraReducers: (builder)=>{
//         builder.addCase(getCategories.fulfilled, (state, action) => {
//             // Add user to the state array
//               state.loading = false;
//           state.categories = action.payload
//           })
//           builder.addCase(getCategories.rejected, (state, action) => {
//             // Add user to the state array
//                 state.loading = false;
//           state.error = action.payload;
//           })
//           builder.addCase(getCategories.pending, (state, action) => {
//             // Add user to the state array
//             state.loading = true;
//           })
    
//       },
    
//   })
//   export default categorySlice.reducer;