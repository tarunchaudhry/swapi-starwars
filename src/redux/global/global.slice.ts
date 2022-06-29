import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
  list: any;
  isLoading: boolean;
}

const initialState = {
  list: {
    data: [],
    error: {},
  },
  isLoading: false,
} as GlobalState;

const globalSlice = createSlice({
  name: 'globalData',
  initialState,
  reducers: {
    hideLoader(state) {
      state.isLoading = false;
    },
    showLoader(state) {
      state.isLoading = true;
    },
    fetchCharacterData(state) {
      state.isLoading = true;
    },
    setCharacterData(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.list = action.payload || [];
    },
  },
});

export const { fetchCharacterData, setCharacterData } = globalSlice.actions;
export default globalSlice.reducer;
