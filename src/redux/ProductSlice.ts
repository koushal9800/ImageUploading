import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk("fetchProducts",async()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const result = await res.json()
    return result
})

// Create slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {}, // No extra reducers needed for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        // state.errorMessage = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
