import Cookies from 'js-cookie';

import { authenticate, me, register } from '../lib/auth';
import { setConfig, getConfig } from '../lib/config';
import { mockFetch, mockResponse } from './utils/helpers';

describe('auth.js', () => {
  beforeAll(() => {
    setConfig({ clientId: 'test' });
  });

  describe('authenticate(username, password)', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        accessToken: 'access test',
        refreshToken: 'refresh test',
      }));
    });

    it('should authenticate user and store its auth tokens in ' +
      'cookies', async () => {
      const tokens = await authenticate('test@test.com', 'test');
      expect(tokens.accessToken).toBe('access test');
      expect(tokens.refreshToken).toBe('refresh test');
      expect(Cookies.get(getConfig('cookieNames.accessToken')))
        .toBe(tokens.accessToken);
      expect(Cookies.get(getConfig('cookieNames.refreshToken')))
        .toBe(tokens.refreshToken);
    });
  });

  describe('me()', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        username: 'test@test.com',
      }));
    });

    it('should allow to retrieve authenticated user informations', async () => {
      Cookies.set(getConfig('cookieNames.accessToken'), 'access test');
      const user = await me();
      expect(user.username).toBe('test@test.com');
    });
  });

  describe('register(username, password)', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        accessToken: 'access test',
        refreshToken: 'refresh test',
      }));
    });

    it('should allow to register a new user', async () => {
      const tokens = await register('test@test.com', 'test');
      expect(tokens.accessToken).toBe('access test');
      expect(tokens.refreshToken).toBe('refresh test');
      expect(Cookies.get(getConfig('cookieNames.accessToken')))
        .toBe(tokens.accessToken);
      expect(Cookies.get(getConfig('cookieNames.refreshToken')))
        .toBe(tokens.refreshToken);
    });
  });

  afterEach(() => {
    Cookies.remove(getConfig('cookieNames.accessToken'));
    Cookies.remove(getConfig('cookieNames.refreshToken'));
  });
});
