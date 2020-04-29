import { getConfig } from './config';
import { request, requestWithRetry, writeTokens } from './http';

export const authenticate = async (username, password, options = {}) => {
  const tokens = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/auth/token`,
    body: {
      grantType: 'password',
      username,
      password,
      clientId: getConfig('clientId'),
      redirectUri: getConfig('redirectUri'),
    },
    ...options,
  });

  writeTokens(tokens);

  return tokens;
};

export const me = async (options = {}) => {
  const infos = await requestWithRetry({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/auth/me`,
    ...options,
  });

  return infos;
};

export const register = async (username, password, options = {}) => {
  const tokens = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/auth/register`,
    body: {
      username,
      email: username,
      password,
    },
    ...options,
  });

  return tokens;
};
