const API_HOST = `https://swapi.dev/api`;

// API
export const API_GET_PEOPLE_LIST = `${API_HOST}/people`;
export const API_GET_PER_PERSON = (id: number) => `${API_HOST}/people/${id}`;
