// userSlice.ts;
import { Admin, AppUser } from "@/types/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: AppUser | null;
  userLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  userLoggedIn: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser | null>) => {
      if (action.payload) {
        state.currentUser = action.payload;
        state.userLoggedIn = true;
      } else {
        state.currentUser = null;
        state.userLoggedIn = false;
      }
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.userLoggedIn = false;
      state.error = null;
    },
    updateUserData: (state, action: PayloadAction<Partial<Admin>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setError,
  clearError,
  logout,
  updateUserData,
} = userSlice.actions;
export default userSlice.reducer;
