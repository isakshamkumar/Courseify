import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@prisma/client";

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchUserData = createAsyncThunk<User>('user/fetchUser', async () => {
  try {
    console.log('startingggggggggggggggggggggg');
    
    const response = await fetch('/api/me');
    if (!response.ok) throw new Error("Error fetching Data for User");
    const data = await response.json();
    console.log(data,'thunkkkkkkkkkkkkkkkkkkkk');
    
    return data.user;
  } catch (error) {
    console.error("Error Fetching User Data", error);
    throw error; 
    // Propagate the error to handle it in the component or where it's called
  }
});

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<User>) => {
      state.status = 'succeeded';
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = 'failed';
      state.error = null;
      state.user=null
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;