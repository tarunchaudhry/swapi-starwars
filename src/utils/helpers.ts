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

const getFormattedRows = (data: any) => {
  const formatDocs = data.map((item: any) => {
    if (item) {
      return {
        ...item,
      };
    }
    return item;
  });
  return formatDocs;
};

/**
 * Get Formatted row data for the table
 * @param {any} categoryList - List of all category
 * @param {any} router - Router path and function
 * @returns {string}
 */
export const getTableRowData = (
  data: any,
  headerData: any,
  isRows?: boolean
) => {
  if (data && data.length) {
    const formattedDocs = {
      rows: getFormattedRows(data),
      header: headerData,
      pagination: {},
    };
    if (isRows) {
      return formattedDocs.rows;
    }
    return formattedDocs;
  }
  return [];
};

export const getRowData = (row: any, header: any) => {
  if (row && header && header.accessor) {
    if (row[header.accessor]) {
      return row[header.accessor];
    }
    return '-';
  }
  return '-';
};

export const getRowSecondData = (row: any, header: any, acc: string) => {
  if (row && header && header[acc]) {
    return row[header[acc]];
  }
  return '-';
};

export const getTitleData = (row: any, header: any) => {
  if (row && header && header.title) {
    return row[header.title];
  }
  if (row && header && header.accessor) {
    if (row[header.accessor]) {
      return row[header.accessor];
    }
    return '-';
  }
  return '-';
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

export const getErrorMessage = (
  serverMsg: string,
  formMsg1: any,
  formMsg2: any
) => {
  if (formMsg1 && formMsg1.message) {
    return formMsg1?.message;
  }
  if (formMsg2 && formMsg2.message) {
    return formMsg2?.message;
  }
  if (serverMsg) {
    return serverMsg;
  }
  return '';
};

export const formatPermission = (data: any) => {
  let permissions: Array<any> = [];
  if (data && data.departments && data.departments.length) {
    data.departments.forEach((items: any) => {
      if (
        items.role &&
        items.role.permissions &&
        items.role.permissions.length
      ) {
        permissions = [...permissions, ...items.role.permissions];
      }
    });
    return permissions;
  }
  return permissions;
};

/**
 * Rounding for PaymentList page
 * @params num
 * @return number
 */

export const customRound = (num: number) => {
  return Math.round(100 * num) / 100;
};
