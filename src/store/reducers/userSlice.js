import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const host = "http://localhost:8080/auth"
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
       host + "/login",
      userCredentials,
    );
    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("jwt", response.jwt);
    return response;
  }
);

export const registerUser = createAsyncThunk(
    "user/register",
    async (registerRequest) => {
        console.log(registerRequest)
        const request = await axios.post(
            host + "/register",
            registerRequest,
        );
        const response = await request.data;
        return response;
    }
);

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const registerUserSlice = createSlice( {
    name: "registerUser",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
    },
});

export default userSlice.reducer;
export const registerUserReducer = registerUserSlice.reducer;
