import {
  API_HOST,
  API_GET_PER_PERSON,
  API_GET_SEARCH_DATA,
  API_GET_PEOPLE_LIST,
  API_GET_ALL_PLANET_DATA,
} from "./apiUrls";

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe("Index page", () => {
  it("should have apiUrl", () => {
    const allDataUrl = API_GET_PEOPLE_LIST(4321, 'text');
    expect(allDataUrl).toBe(`${API_HOST}/people/?page=4321&search=text`);
    const personUrl = API_GET_PER_PERSON(123);
    expect(personUrl).toBe(`${API_HOST}/people/123`);
    const searchUrl = API_GET_SEARCH_DATA('text1');
    expect(searchUrl).toBe(`${API_HOST}/people/?search=text1`);
    const planetUrl = API_GET_ALL_PLANET_DATA(6);
    expect(planetUrl).toBe(`${API_HOST}/planets/?page=6`);
  });
});
