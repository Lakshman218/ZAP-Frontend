import { createSlice } from "@reduxjs/toolkit";

const AdminInitialState = {
  admin: null,
  token: null,
}

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: AdminInitialState,
  reducers: {
    AdminLoginSuccuss: (state, action) => {  
      state.admin = action.payload.admin;
      state.token = action.payload.admin.token;
    },
    AdminLogout: (state) => {
      state.admin = null;
      state.token = null;
    }
  }
})

export const {AdminLoginSuccuss, AdminLogout} = adminAuthSlice.actions
export default adminAuthSlice.reducer;