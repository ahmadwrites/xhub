import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedGroups.includes(action.payload)) {
        state.currentUser.subscribedGroups.splice(
          state.currentUser.subscribedGroups.findIndex(
            (groupdId) => groupdId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedGroups.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;
