import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface FavoriteState {
  listFavorite: any;
  isLoading: boolean;
  error: any;
}

const initialState = {
  listFavorite: [],
  error: {},
  isLoading: false,
} as FavoriteState;

const favoriteSlice = createSlice({
  name: 'favoriteDate',
  initialState,
  reducers: {
    setFavoriteData(state, action: PayloadAction<any>) {
      const stateRaw = [...state.listFavorite];
      stateRaw.push(action.payload);
      state.listFavorite = stateRaw;
    },
    unsetFavoriteData(state, action: PayloadAction<any>) {
      const stateRaw = [...state.listFavorite];
      state.listFavorite = stateRaw.filter(
        (items) => items.name !== action.payload
      );
    },
    updateFavoriteData(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.listFavorite = action.payload || [];
    },
  },
});

export const { setFavoriteData, unsetFavoriteData, updateFavoriteData } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
