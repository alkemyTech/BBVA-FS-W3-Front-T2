import { configureStore } from "@reduxjs/toolkit";
import userReducer, {registerUserReducer} from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer, registerUser: registerUserReducer,
  },
});

export default store;
