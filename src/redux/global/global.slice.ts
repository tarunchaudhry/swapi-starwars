import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
  list: any;
  isLoading: boolean;
  userDetails: any;
  planets: any;
  error: any;
}

const initialState = {
  list: {
    data: [],
    error: {},
    next: null,
  },
  planets: [],
  userDetails: {},
  error: {},
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
    fetchPlanetData(state) {
      state.isLoading = true;
    },
    setPlanetData(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.planets = action.payload?.data || state.planets;
      state.error = action.payload.error;
    },
    getPersonDetails(state) {
      state.isLoading = true;
    },
    setPersonDetails(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.userDetails = action.payload.data;
      state.error = action.payload.error;
    },
  },
});

export const {
  fetchCharacterData,
  setCharacterData,
  fetchPlanetData,
  setPlanetData,
  getPersonDetails,
  setPersonDetails,
} = globalSlice.actions;
export default globalSlice.reducer;
