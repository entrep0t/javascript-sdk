export const mockResponse = (body = {}, options = {}) => ({
  body,
  status: 200,
  statusText: 'OK',
  ...options,
  headers: {
    _headers: Object.entries(options.headers || {}).reduce((res, [k, v]) => {
      res[k.toLowerCase()] = v;

      return res;
    }, {}),
    get: function (key) { return this._headers[key.toLowerCase()]; },
    set: function (key, value) { this._headers[key.toLowerCase()] = value; },
  },
});

let globalFetch;

export const mockFetch = (
  response,
  { autoUnmock = true, ...mockOptions } = {},
) => {
  unmockFetch();
  globalFetch = global.fetch;

  global.fetch = (url, options) => {
    autoUnmock && unmockFetch();

    if (mockOptions.networkError) {
      return null;
    }

    const result = Promise.resolve({
      ...response,
      url,
      request: { url, ...options },
      json: () => Promise.resolve(
        typeof response.body === 'function'
          ? response.body({
            url,
            ...options,
            rawBody: JSON.parse(options.body),
          })
          : response.body
      ),
    });

    if (mockOptions.successOnRetry) {
      response.status = 200;
      response.statusText = 'OK';
    }

    if (mockOptions.delay) {
      return new Promise(resolve => {
        setTimeout(() => resolve(result), mockOptions.delay);
      });
    }

    return result;
  };
};

export const unmockFetch = () => {
  global.fetch = globalFetch;
};
