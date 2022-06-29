// Library Methods
import axios from 'axios';

// Helper Methods

// Create an instance of axios
const mainAxiosInstance = axios.create();

// Set default headers on our axios instance
// @ts-ignore
mainAxiosInstance.defaults.headers['Content-Type'] = 'application/json';
/**
 * To create request headers and options for xhr request
 *
 * @param {Object} headerOptions - Holds custom header options passed. Default value is {}
 * @returns {Object} - Holds final request headers and options for xhr request
 */
const createRequestOptions = (headerOptions = {}) => {
  const options = {
    headers: {
      ...headerOptions,
    },
    withCredentials: false,
  };
  return { options };
};

/**
 * To make xhr "POST" request
 *
 * @param {String} apiUrl - URL of API
 * @param {Object} data - Data that needs to be sent
 * @param {Object} headerOptions - Request headers that get merged with default headers
 * @returns Promise object that gets resolved / reject depending on the result of API call
 */
const POST = (
  apiUrl: string,
  data = null,
  headerOptions?: any,
  notStringify?: boolean
) => {
  const { options } = createRequestOptions(headerOptions);
  const request = notStringify ? data : JSON.stringify(data);
  return mainAxiosInstance.post(apiUrl, request, options);
};

/**
 * To make xhr "PUT" request
 *
 * @param {String} apiUrl - URL of API
 * @param {Object} data - Data that needs to be sent
 * @param {Object} headerOptions - Request headers that get merged with default headers
 * @returns Promise object that gets resolved / reject depending on the result of API call
 */
const PUT = (
  apiUrl: string,
  data = null,
  headerOptions?: any,
  notStringify?: boolean
) => {
  const { options } = createRequestOptions(headerOptions);
  const request = notStringify ? data : JSON.stringify(data);
  return mainAxiosInstance.put(apiUrl, request, options);
};

const DELETE = (
  apiUrl: string,
  data = null,
  headerOptions?: any,
  notStringify?: boolean
) => {
  const { options } = createRequestOptions(headerOptions);
  const request = notStringify ? data : JSON.stringify(data);
  // @ts-ignore
  return mainAxiosInstance.delete(apiUrl, request, options);
};

/**
 * To make xhr "GET" request
 *
 * @param {String} apiUrl - URL of API
 * @param {Object} headerOptions - Request headers that get merged with default headers
 * @returns Promise object that gets resolved / reject depending on the result of API call
 */
const GET = (apiUrl: string, headerOptions?: any) => {
  const { options } = createRequestOptions(headerOptions);
  return mainAxiosInstance.get(apiUrl, options);
};

export { DELETE, GET, POST, PUT };
