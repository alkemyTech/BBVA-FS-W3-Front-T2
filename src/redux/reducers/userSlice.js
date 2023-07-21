import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      "http://localhost:8080/auth/login",
      userCredentials
    );
    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("jwt", response.jwt);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedValues) => {
    const jwt = localStorage.getItem("jwt");
    const id = JSON.parse(localStorage.getItem("user")).id;
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const request = await axios.patch(
      `http://localhost:8080/users/${id}`,
      updatedValues,
      config
    );
    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response));
    // Actualizar store
    return response;
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
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
