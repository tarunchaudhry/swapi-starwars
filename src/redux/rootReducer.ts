// Libraries
import { combineReducers } from '@reduxjs/toolkit';

// Redux
import favoriteReducer from './favorite/favorite.slice';
import globalReducer from './global/global.slice';

export const rootReducer = combineReducers({
  globalData: globalReducer,
  favoriteData: favoriteReducer,
});
