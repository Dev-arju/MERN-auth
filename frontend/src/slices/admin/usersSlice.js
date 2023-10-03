import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  usersList: [],
  err: "",
};

const usersSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    sendRequest: (state, action) => {
      state.isLoading = true;
    },
    saveResponse: (state, action) => {
      (state.isLoading = false), (state.usersList = action.payload);
    },
    saveError: (state, action) => {
      (state.isLoading = false),
        (state.usersList = []),
        (state.err = action.payload);
    },
    deleteUser: (state, action) => {
      state.usersList = state.usersList.filter(
        (user) => user._id != action.payload
      );
    },
    changeUserStatus: (state, action) => {
      state.usersList = state.usersList.map((user) => {
        if (user._id === action.payload) {
          return {
            ...user,
            isActive: !user.isActive,
          };
        }
        return user;
      });
    },
  },
});

export const {
  sendRequest,
  saveResponse,
  saveError,
  deleteUser,
  changeUserStatus,
} = usersSlice.actions;
export default usersSlice.reducer;
