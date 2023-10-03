import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  authData: localStorage.getItem("user") ? localStorage.getItem("user") : [],
  error: "",
};

const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.isLoading = false;
      state.authData = action.payload;
      state.error = "";
      localStorage.setItem("user", action.payload)
    },
    dropCredential: (state) => {
      state.isLoading = false;
      state.authData = [];
      state.error = "";
      localStorage.removeItem('user')
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
} = userSlice.actions;
export default userSlice.reducer;
