import { combineReducers } from '@reduxjs/toolkit';

import globalReducer from './redux/global/global.slice';

export const rootReducer = combineReducers({
  globalData: globalReducer,
});
