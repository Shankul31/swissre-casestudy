import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DEMO_USER, type AuthenticatedUser } from './authorization';

interface AuthState {
  user: AuthenticatedUser | null;
}

const initialState: AuthState = {
  user: DEMO_USER,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action: PayloadAction<AuthenticatedUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthenticatedUser } = authSlice.actions;
export default authSlice.reducer;
