export const isUndefined = v => typeof v === 'undefined';

export const isNull = v => v === null;

export const exists = v => !isNull(v) && !isUndefined(v);

export const get = (obj = {}, path = '', defaultValue = null) => path
  .split('.')
  .reduce((a, c) => (
    exists(a) && exists(a[c])
      ? a[c]
      : defaultValue
  ), obj);
