// Libraries
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';

// List of Apis
import {
  API_GET_ALL_PLANET_DATA,
  API_GET_PEOPLE_LIST,
  API_GET_SEARCH_DATA,
} from '@/constants/apiUrls';

// Utils
import { GET } from '../../utils/fetchWrapper';
// Redux
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
    const { data, status } = yield call(
      GET,
      API_GET_PEOPLE_LIST(payload.pageNum, payload.searchText)
    );
    if (status === 200 && data.results) {
      yield put(
        setCharacterData({ data: data.results, error: {}, next: data.next })
      );
    } else {
      yield put(setCharacterData({ data: [], error: data }));
      toast.error('Internal Server Error', { theme: 'dark' });
    }
  } catch (response: any) {
    const { data } = response;
    if (data && data.errorData) {
      yield put(setCharacterData({ data: [], error: data }));
    } else {
      yield put(setCharacterData({ data: [], error: data }));
      toast.error('Internal Server Error', { theme: 'dark' });
    }
  }
}

// Individual person details
function* personDetails(actions: any) {
  const { payload } = actions;
  try {
    const { data, status } = yield call(GET, API_GET_SEARCH_DATA(payload));
    if (status === 200 && data.results) {
      const userData = data?.results?.[0];
      let filmsValues = new Array<any>();
      let starShipValues = new Array<any>();
      const { films, starships } = userData;
      for (let count = 0; count <= films.length - 1; count += 1) {
        const urlFilm = films[count];
        const response = yield call(GET, urlFilm);
        if (response.status === 200 && response.data) {
          yield (filmsValues = [...filmsValues, ...[response.data]]);
        }
      }
      for (let count1 = 0; count1 <= starships.length - 1; count1 += 1) {
        const urlStar = starships[count1];
        const response2 = yield call(GET, urlStar);
        if (response2.status === 200 && response2.data) {
          yield (starShipValues = [...starShipValues, ...[response2.data]]);
        }
      }
      const payLoad = {
        userData,
        filmsValues,
        starShipValues,
      };
      yield put(setPersonDetails({ data: payLoad, error: {} }));
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

// Get All planets data
function* getPlanetDetails(actions: any) {
  const {
    payload: { callBack },
  } = actions;
  try {
    let planets = new Array<any>();
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
