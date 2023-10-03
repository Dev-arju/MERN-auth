import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoading: false,
  authData: localStorage.getItem("admin") ? localStorage.getItem("admin") : [],
  error: "",
};

const adminSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.isLoading = false;
      state.authData = action.payload;
      state.error = "";
      localStorage.setItem("admin", action.payload)
    },
    dropCredential: (state) => {
      state.isLoading = false;
      state.authData = [];
      state.error = "";
      localStorage.removeItem('admin')
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.authData = [];
      state.error = action.payload;
    },
  },
});

export const { setCredential,
    setLoading,
    setError,
    dropCredential
} = adminSlice.actions;
export default adminSlice.reducer;
