import { setConfig, getConfig } from '../lib/config';

describe('config.js', () => {
  it('should store config values and make them accessible', () => {
    setConfig({ clientId: 'test' });
    expect(getConfig('clientId')).toBe('test');
  });

  it('should allow to set a nested value and retrieve it', () => {
    setConfig({ cookieNames: { sessionId: 'test' } });
    expect(getConfig('cookieNames.sessionId')).toBe('test');
  });

  it('should allow to call setConfig without any arg', () => {
    let error;

    try {
      setConfig();
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });
});
