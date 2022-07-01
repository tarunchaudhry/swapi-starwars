// Libraries
import { all, fork } from 'redux-saga/effects';

// Saga Files
import globalSaga from './global/global.saga';

/**
 * Root Saga
 */
export function* rootSaga() {
  yield all([fork(globalSaga)]);
}
