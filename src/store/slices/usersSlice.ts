import { AppUser } from "@/types/userTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersListType {
  usersList: AppUser[];
}

const initialState: UsersListType = {
  usersList: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<AppUser[]>) => {
      // Normalize: ensure all users have 'uid' field
      state.usersList = (action.payload ?? []).map((user) => ({
        ...user,
        uid: user.uid,
      }));
    },

    setUpdatedUser: (state, action: PayloadAction<AppUser>) => {
      console.log("🔴 setUser reducer called with:", action.payload);

      const incoming = action.payload;
      const index = state.usersList.findIndex((u) => u.uid === incoming.uid);

      console.log("🔴 Found at index:", index);
      console.log("🔴 Current users count:", state.usersList.length);

      if (index === -1) {
        state.usersList.push(incoming);
      } else {
        state.usersList[index] = incoming;
      }

      console.log(
        "🔴 After update, user status:",
        state.usersList[index]?.status
      );
    },
  },
});

export const { setUsers, setUpdatedUser } = usersSlice.actions;
export default usersSlice.reducer;
