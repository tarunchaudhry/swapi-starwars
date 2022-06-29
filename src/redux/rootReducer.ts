import { combineReducers } from '@reduxjs/toolkit';

import globalReducer from './global/global.slice';

export const rootReducer = combineReducers({
  globalData: globalReducer,
});
