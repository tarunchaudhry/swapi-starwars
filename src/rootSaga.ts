import { all, fork } from 'redux-saga/effects';

import globalSaga from './redux/global/global.saga';

/**
 * rootSaga
 */
export function* rootSaga() {
  yield all([fork(globalSaga)]);
}
