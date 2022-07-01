const API_HOST = `https://swapi.dev/api`;

// API
export const API_GET_PEOPLE_LIST = (id: number, searchText: string) =>
  `${API_HOST}/people/?page=${id}&search=${searchText}`;
export const API_GET_PER_PERSON = (id: number) => `${API_HOST}/people/${id}`;
export const API_GET_SEARCH_DATA = (key: string) =>
  `${API_HOST}/people/?search=${key}`;
export const API_GET_ALL_PLANET_DATA = (page: number) =>
  `${API_HOST}/planets/?page=${page}`;
export const API_GET_PLANET_DATA = (key: string) =>
  `${API_HOST}/planets/${key && `?search=${key}`}`;
