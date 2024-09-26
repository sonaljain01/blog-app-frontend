import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  name: string;
  email: string;
  type: string;
  id:string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: "",
  name: "",
  type: "",
  id:"",
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    profile: (state, action) => {
      state.isAuthenticated = true;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.type = action.payload.type;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.email = "";
      state.name = "";
      state.type = "";
    },
  },
});

export const { logout, profile } = authSlice.actions;
export default authSlice.reducer;
