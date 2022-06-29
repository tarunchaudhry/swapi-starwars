import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';

import { API_GET_PEOPLE_LIST } from '../../constants/apiUrls';
// Utils
import { GET } from '../../utils/fetchWrapper';
import { fetchCharacterData, setCharacterData } from './global.slice';

// Get Person List of star wars
function* getPersonList() {
  try {
    const { data, status } = yield call(GET, API_GET_PEOPLE_LIST);
    if (status === 200 && data.results) {
      yield put(setCharacterData({ data: data.results, error: {} }));
    } else {
      yield put(setCharacterData({ data: [], error: data }));
      toast.error('Internal Server Error', { theme: 'dark' });
    }
  } catch (response) {
    const { data } = response;
    if (data && data.errorData) {
      yield put(setCharacterData({ data: [], error: data }));
    } else {
      yield put(setCharacterData({ data: [], error: data }));
      toast.error('Internal Server Error', { theme: 'dark' });
    }
  }
}

/**
 * Global Sagas
 */
export default function* root() {
  yield takeLatest(fetchCharacterData, getPersonList);
}
