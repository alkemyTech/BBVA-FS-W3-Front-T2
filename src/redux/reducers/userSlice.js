import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as loginService from "../../services/loginService";
import * as userService from "../../services/userService";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
      const response = await loginService.loginUser(userCredentials);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("jwt", response.jwt);
      return response;
    } 
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedValues) => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    const response = await userService.updateUser(updatedValues, id);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
);

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message 
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
