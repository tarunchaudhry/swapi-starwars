import { format } from 'date-fns';

/**
 * Stringifies and stores data in local storage
 *
 * @param  {string} key - Key name
 * @param  {instanceOf(Object)} data - Data to be stored in localStorage
 * @returns {undefined}
 */
export const setToLocalStorage = (key: string, data: any) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

/**
 * Fetches and parses data from local storage
 *
 * @param  {string} key - Key name
 * @returns {instanceOf(Object)} - data from local storage
 */
export const getFromLocalStorage = (key: string) => {
  if (typeof localStorage !== 'undefined') {
    // @ts-ignore
    return (localStorage && JSON.parse(localStorage.getItem(key))) || null;
  }
};

/**
 * Removes a key from local storage
 *
 * @param {String} key - Key Name
 * @returns {undefined}
 */
export const removeFromLocalStorage = (key: string) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
  }
};

/**
 * Stringifies and stores data in SessionStorage
 *
 * @param  {string} key - Key name
 * @param  {instanceOf(Object)} data - Data to be stored in SessionStorage
 * @returns {undefined}
 */
export const setToSessionStorage = (key: string, data: any) => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

/**
 * Fetches and parses data from SessionStorage
 *
 * @param  {string} key - Key name
 * @returns {instanceOf(Object)} - data from SessionStorage
 */
export const getFromSessionStorage = (key: string) => {
  if (typeof sessionStorage !== 'undefined') {
    // @ts-ignore
    const value = sessionStorage.getItem(key);
    const formattedValue = value && value.replace(/["'']/g, '');
    return formattedValue;
  }
};

/**
 * Removes a key from SessionStorage
 *
 * @param {String} key - Key Name
 * @returns {undefined}
 */
export const removeFromSessionStorage = (key: string) => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem(key);
  }
};

/**
 * Capitalization of string
 *
 * @param {String} key - Key Name
 * @returns {string}
 */
export const capitaliseString = (str: string) => {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  // Return the joined string
  return splitStr.join(' ');
};

export function imageSize(url: string) {
  const img = document.createElement('img');

  const promise = new Promise((resolve, reject) => {
    img.onload = () => {
      // Natural size is the actual image size regardless of rendering.
      // The 'normal' `width`/`height` are for the **rendered** size.
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      // Resolve promise with the width and height
      resolve({ width, height });
    };

    // Reject promise on error
    img.onerror = reject;
  });

  // Setting the source makes it start downloading and eventually call `onload`
  img.src = url;

  return promise;
}

export async function getImage(image: any) {
  if (typeof image !== 'string') {
    const url = URL.createObjectURL(image);
    const dimensions: any = await imageSize(url);
    return dimensions;
  }
  return null;
}

export const formatDateTime = (date: any, isDateOnly?: boolean) => {
  if (!date) {
    return '-';
  }
  const localData = new Date(date);
  if (isDateOnly) {
    return format(localData, 'dd MMMM yyyy');
  }
  return format(localData, 'dd/MM/yyyy hh:mm, a');
};

/**
 * Rounding for PaymentList page
 * @params num
 * @return number
 */

export const customRound = (num: number) => {
  return Math.round(100 * num) / 100;
};

/**
 * Get Planet Name for PaymentList page
 * @params url string
 * @return string
 */
export const getPlanetName = (url: string, planets: any) => {
  const planet = planets.find((items: any) => items.url === url);
  return (planet && planet.name) || '-';
};

/**
 * Get character value
 * @params name string
 * @return boolean
 */
export const isFavorite = (name: string, data: any) => {
  if (data && data.length && name) {
    const isAvailable = data.find((items: any) => items.name === name);
    return isAvailable;
  }
  return null;
};
