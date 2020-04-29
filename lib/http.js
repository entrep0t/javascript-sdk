import queryString from 'query-string';
import Cookies from 'js-cookie';

import { getConfig } from './config';

export const DEFAULT_LIST_PARAMS = {
  page: 1,
  count: 10,
  sort: 'createdAt:-1',
};

export const request = async options => {
  if (!getConfig('clientId')) {
    const response = {
      code: 0,
      message: 'Client ID was not set in configuration. Please use ' +
        '`setConfig({ clientId: \'your_client_id\' })` in order to retrieve ' +
        'your entrepot objects.',
    };

    throw response;
  }

  let timedOut = false;
  const requestTimeout = setTimeout(() => {
    timedOut = true;
    const response = {
      code: 0,
      message: 'Request timeout',
    };
    throw response;
  }, getConfig('fetchTimeout'));

  options.url = options.qs
    ? `${options.url}?${queryString.stringify(options.qs)}`
    : options.url;

  options.headers = options.headers || {};
  if (options.auth !== false && getAccessToken()) {
    options.headers.Authorization =
      `Bearer ${btoa(options.auth?.accessToken || getAccessToken())}`;
  }

  if (options.session !== false && getSessionId()) {
    options.headers.Session = options.session?.id || getSessionId();
  }

  const response = await fetch(options.url, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Store: getConfig('clientId'),
      ...options.headers,
    },
    method: options.method,
    body: options.body ? JSON.stringify(options.body) : null,
  });

  if (timedOut) {
    return null;
  }

  if (!response || !response.json) {
    const response = {
      code: 0,
      message: 'Network error',
    };
    throw response;
  }

  clearTimeout(requestTimeout);
  return parseResponse(response);
};

const parseResponse = async response => {
  let payload = {};

  try {
    payload = await response.json();
  } catch (e) {
    payload.code = 0;
    payload.message = e;
  }

  if (response.status >= 400) {
    payload.url = response.url;
    payload.code = response.status;
    payload.message = response.statusText;
    payload.error = response.statusText;
    throw payload;
  }

  const sessionId = response.headers.get('session');
  sessionId && writeSession(sessionId);

  return payload;
};

const getAccessToken = () =>
  Cookies.get(getConfig('cookieNames.accessToken'));

const getRefreshToken = () =>
  Cookies.get(getConfig('cookieNames.refreshToken'));

const getSessionId = () =>
  Cookies.get(getConfig('cookieNames.sessionId'));

export const writeTokens = tokens => {
  Cookies.set(getConfig('cookieNames.accessToken'),
    tokens.accessToken, getConfig('cookieOptions'));
  Cookies.set(getConfig('cookieNames.refreshToken'),
    tokens.accessToken, getConfig('cookieOptions'));
};

export const writeSession = sessionId => {
  Cookies.set(
    getConfig('cookieNames.sessionId'),
    sessionId,
    { ...getConfig('cookieOptions'), expires: null }
  );
};

export const requestWithRetry = async (options) => {
  let response = await request(options);
  const refreshToken = getRefreshToken();

  if (response.status === 403 && refreshToken) {
    const tokens = await request({
      method: 'POST',
      url: `${getConfig('apiUrl')}/store/auth/token`,
      body: {
        grantType: 'refresh_token',
        refreshToken,
        clientId: getConfig('clientId'),
        redirectUri: getConfig('redirectUri'),
      },
    });

    writeTokens(tokens);

    response = await request(options);
  }

  return response;
};
