const API_HOST = `https://swapi.dev/api`;

// API
// Api for get all Characters of star wars
export const API_GET_PEOPLE_LIST = (id: number, searchText: string) =>
  `${API_HOST}/people/?page=${id}&search=${searchText}`;

// Api for get the data of individual Characters of star wars
export const API_GET_PER_PERSON = (id: number) => `${API_HOST}/people/${id}`;

// Api for search by name
export const API_GET_SEARCH_DATA = (key: string) =>
  `${API_HOST}/people/?search=${key}`;

// Api to get all planet data by page
export const API_GET_ALL_PLANET_DATA = (page: number) =>
  `${API_HOST}/planets/?page=${page}`;
