import { combineReducers } from '@reduxjs/toolkit';

import favoriteReducer from './favorite/favorite.slice';
import globalReducer from './global/global.slice';

export const rootReducer = combineReducers({
  globalData: globalReducer,
  favoriteData: favoriteReducer,
});
