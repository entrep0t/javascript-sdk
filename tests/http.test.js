import Cookies from 'js-cookie';

import { request, requestWithRetry } from '../lib/http';
import { setConfig, getConfig } from '../lib/config';
import { mockFetch, mockResponse, unmockFetch } from './utils/helpers';

describe('http.js', () => {
  const url = 'https://test.com/foo/bar';

  beforeAll(() => {
    setConfig({ clientId: 'test' });
  });

  beforeEach(() => {
    mockFetch(mockResponse({
      foo: 'bar',
    }));
  });

  describe('request()', () => {
    it('should allow to make an http request', async () => {
      const result = await request({ url });
      expect(result.foo).toBe('bar');
    });

    it('should throw an error when clientId is not set in config', async () => {
      setConfig({ clientId: null });

      let error;

      try {
        await request({ url });
      } catch (e) {
        error = e;
      }

      expect(/^Client ID was not set/.test(error.message)).toBe(true);
      setConfig({ clientId: 'test' });
    });

    it('should throw an error when a request times out', async () => {
      mockFetch(mockResponse({
        foo: 'bar',
      }), { delay: 20 });

      let error;

      try {
        await request({ url, timeout: 10 });
      } catch (e) {
        error = e;
      }

      expect(error.message).toBe('Request timeout');
    });

    it('should allow to pass url parameters', async () => {
      const result = await request({
        url,
        qs: { foo: 'bar' },
        returnFullResponse: true,
      });

      expect(result.request.url).toBe(url + '?foo=bar');
    });

    it('should allow to send a post request with body params', async () => {
      const result = await request({
        method: 'POST',
        url,
        body: { foo: 'bar' },
        returnFullResponse: true,
      });

      expect(result.request.body).toBe(JSON.stringify({ foo: 'bar' }));
    });

    it('should throw an error on a browser network issue', async () => {
      mockFetch(mockResponse({
        foo: 'bar',
      }), { networkError: true });

      let error;

      try {
        await request({
          url,
          returnFullResponse: true,
        });
      } catch (e) {
        error = e;
      }

      expect(error.message).toBe('Network error');
    });

    it('should allow to pass custom request headers', async () => {
      const result = await request({
        url,
        headers: { Authorization: 'Bearer test' },
        returnFullResponse: true,
      });

      expect(result.request.headers.Authorization).toBe('Bearer test');
    });

    it('should automatically pass auth when an accessToken is found in ' +
      'cookies', async () => {
      const accessToken = 'test';
      Cookies.set(getConfig('cookieNames.accessToken'), accessToken);

      const result = await request({
        url,
        returnFullResponse: true,
      });

      expect(result.request.headers.Authorization)
        .toBe(`Bearer ${btoa(accessToken)}`);
      Cookies.remove(getConfig('cookieNames.accessToken'));
    });

    it('should not pass auth when an accessToken is found in cookies but ' +
      'auth is explicitely disabled in request', async () => {
      const accessToken = 'test';
      Cookies.set(getConfig('cookieNames.accessToken'), accessToken);

      const result = await request({
        url,
        auth: false,
        returnFullResponse: true,
      });

      expect(result.request.headers.Authorization).toBeUndefined();
      Cookies.remove(getConfig('cookieNames.accessToken'));
    });

    it('should automatically pass session when a sessionId is found in ' +
      'cookies', async () => {
      const sessionId = 'test';
      Cookies.set(getConfig('cookieNames.sessionId'), sessionId);

      const result = await request({
        url,
        returnFullResponse: true,
      });

      expect(result.request.headers.Session).toBe(sessionId);
      Cookies.remove(getConfig('cookieNames.sessionId'));
    });

    it('should not pass auth when an accessToken is found in cookies but ' +
      'auth is explicitely disabled in request', async () => {
      const sessionId = 'test';
      Cookies.set(getConfig('cookieNames.sessionId'), sessionId);

      const result = await request({
        url,
        session: false,
        returnFullResponse: true,
      });

      expect(result.request.headers.Session).toBeUndefined();
      Cookies.remove(getConfig('cookieNames.sessionId'));
    });

    it('should throw an error when response content is not json', async () => {
      mockFetch(mockResponse(new Promise(() => JSON.parse('{'))));

      let error;

      try {
        await request({ url });
      } catch (e) {
        error = e;
      }

      expect(/Unexpected end of JSON input$/.test(error.message)).toBe(true);
    });

    it('should throw an error when response status is >= 400', async () => {
      mockFetch(mockResponse({}, { status: 400, statusText: 'Bad Request' }));

      let error;

      try {
        await request({ url });
      } catch (e) {
        error = e;
      }

      expect(error.code).toBe(400);
      expect(error.message).toBe('Bad Request');
    });

    it('should automatically write session id in cookies when received ' +
      'from response headers', async () => {
      mockFetch(mockResponse({}, { headers: { Session: 'testSession' } }));

      await request({ url });

      expect(Cookies.get(getConfig('cookieNames.sessionId')))
        .toBe('testSession');
    });
  });

  describe('requestWithRetry()', () => {
    it('should allow to make a normal request if no error is ' +
      'detected', async () => {
      const result = await requestWithRetry({ url });
      expect(result.foo).toBe('bar');
    });

    it('should allow to retry a request on a 403 error', async () => {
      Cookies.set(getConfig('cookieNames.refreshToken'), 'refresh');
      mockFetch(
        mockResponse({ foo: 'bar' }, { status: 403, statusText: 'Forbidden' }),
        { autoUnmock: false, successOnRetry: true }
      );

      const result = await requestWithRetry({ url });

      expect(result.foo).toBe('bar');
      unmockFetch();
      Cookies.remove(getConfig('cookieNames.refreshToken'));
    });

    it('should throw an error when request throws a 403 and refreshToken is ' +
      'not set', async () => {
      mockFetch(
        mockResponse({ foo: 'bar' }, { status: 403, statusText: 'Forbidden' }),
        { autoUnmock: false }
      );

      let error;

      try {
        await requestWithRetry({ url });
      } catch (e) {
        error = e;
      }

      expect(error.code).toBe(403);
      expect(error.message).toBe('Forbidden');
      unmockFetch();
    });

    it('should throw an error when request throw a 403 even after ' +
      'retry', async () => {
      Cookies.set(getConfig('cookieNames.refreshToken'), 'refresh');
      mockFetch(
        mockResponse({ foo: 'bar' }, { status: 403, statusText: 'Forbidden' }),
        { autoUnmock: false, successOnRetry: false }
      );

      let error;

      try {
        await requestWithRetry({ url });
      } catch (e) {
        error = e;
      }

      expect(error.code).toBe(403);
      expect(error.message).toBe('Forbidden');
      unmockFetch();
      Cookies.remove(getConfig('cookieNames.refreshToken'));
    });
  });
});
