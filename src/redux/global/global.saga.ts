import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  API_GET_ALL_PLANET_DATA,
  API_GET_PEOPLE_LIST,
  API_GET_SEARCH_DATA,
} from '@/constants/apiUrls';

// Utils
import { GET } from '../../utils/fetchWrapper';
import {
  fetchCharacterData,
  fetchPlanetData,
  getPersonDetails,
  setCharacterData,
  setPersonDetails,
  setPlanetData,
} from './global.slice';

// Get Person List of star wars
function* getPersonList(actions: any) {
  const { payload } = actions;
  try {
    const { data, status } = yield call(GET, API_GET_PEOPLE_LIST(payload));
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

function* personDetails(actions: any) {
  const { payload } = actions;
  try {
    const { data, status } = yield call(GET, API_GET_SEARCH_DATA(payload));
    if (status === 200 && data.results) {
      yield put(setPersonDetails({ data: data?.results?.[0], error: {} }));
    } else {
      yield put(setPersonDetails({ data: [], error: data }));
      toast.error('Internal Server Error', { theme: 'dark' });
    }
  } catch (response) {
    const { data } = response;
    if (data && data.errorData) {
      yield put(setPersonDetails({ data: [], error: data }));
    } else {
      yield put(setPersonDetails({ data: [], error: data }));
      toast.error('Internal Server Error', { theme: 'dark' });
    }
  }
}

function* getPlanetDetails(actions: any) {
  const {
    payload: { callBack },
  } = actions;
  try {
    let planets = [];
    for (let count = 1; count <= 6; count += 1) {
      const { data, status } = yield call(GET, API_GET_ALL_PLANET_DATA(count));
      if (status === 200 && data.results) {
        yield (planets = [...planets, ...data.results]);
      }
    }
    yield put(setPlanetData({ data: planets, error: [] }));
    callBack();
  } catch (response) {
    const { data } = response;
    if (data && data.errorData) {
      yield put(setPlanetData({ data: [], error: data }));
    } else {
      yield put(setPlanetData({ data: [], error: data }));
      toast.error('Internal Server Error', { theme: 'dark' });
    }
  }
}
/**
 * Global Sagas
 */
export default function* root() {
  yield takeLatest(fetchCharacterData, getPersonList);
  yield takeLatest(getPersonDetails, personDetails);
  yield takeLatest(fetchPlanetData, getPlanetDetails);
}
