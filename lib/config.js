import { get } from './utils';

const defaultConfig = {
  apiUrl: 'https://api.entrepot.dev/api/v1/store',
  clientId: null,
  redirectUri: null,
  fetchTimeout: 30000,
  cookieNames: {
    accessToken: 'entrepotAccessToken',
    refreshToken: 'entrepotRefreshToken',
    sessionId: 'entrepotSession',
  },
  cookieOptions: {
    path: '/',
    domain: window?.location?.hostname,
    expires: 90,
    secure: true,
    sameSite: 'Strict',
  },
};

const customConfig = {};

export const setConfig = config => Object.assign(customConfig, config);
export const getConfig = key => get(customConfig, key, get(defaultConfig, key));
