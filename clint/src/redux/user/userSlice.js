import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  token:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers:{
    LoginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    LoginFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    setToken(state,value){
      state.token = value.payload;
  }},
});

export const { LoginFailure,updateSuccess, setUser, LoginStart ,setToken} = userSlice.actions;
export default userSlice.reducer;
