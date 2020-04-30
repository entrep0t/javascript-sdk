import { isUndefined, isNull, exists, get } from '../lib/utils';

describe('utils.js', () => {
  describe('isUndefined()', () => {
    it('should return true if a value is undefined', () => {
      let foo;
      expect(isUndefined(foo)).toBe(true);
    });

    it('should return false if a value is not undefined', () => {
      const foo = null;
      expect(isUndefined(foo)).toBe(false);
    });
  });

  describe('isNull()', () => {
    it('should return true if a value is null', () => {
      const foo = null;
      expect(isNull(foo)).toBe(true);
    });

    it('should return false if a value is not undefined', () => {
      let foo;
      expect(isNull(foo)).toBe(false);
    });
  });

  describe('exists()', () => {
    it('should return true if a value does exist', () => {
      const foo = true;
      expect(exists(foo)).toBe(true);
    });

    it('should return true if the value exists but is falsy', () => {
      const foo = false;
      expect(exists(foo)).toBe(true);

      const bar = 0;
      expect(exists(bar)).toBe(true);

      const stuff = '';
      expect(exists(stuff)).toBe(true);
    });

    it('should return false if a value does not exist', () => {
      let foo;
      expect(exists(foo)).toBe(false);
    });
  });

  describe('get()', () => {
    it('should allow to get a value of a property in a given object', () => {
      const foo = { bar: 'test' };
      expect(get(foo, 'bar')).toBe('test');
    });

    it('should allow to get a value of a nested property in a given ' +
      'object', () => {
      const foo = { bar: { stuff: 'test' } };
      expect(get(foo, 'bar.stuff')).toBe('test');
    });

    it('should allow to get a particular value in an array', () => {
      const foo = ['bar', 'stuff', 'test'];
      expect(get(foo, '1')).toBe('stuff');
    });

    it('should allow to get a particular value in an array for a given ' +
      'object', () => {
      const foo = { bar: ['stuff', 'test'] };
      expect(get(foo, 'bar.0')).toBe('stuff');
    });

    // We need to go deeper
    it('should allow to get a particular value in a nested property in an ' +
      'array for a given array', () => {
      const foo = { bar: [{ stuff: 'test' }] };
      expect(get(foo, 'bar.0.stuff')).toBe('test');
    });

    it('should not throw an error if any given parameter is null or ' +
      'undefined', () => {
      let error;
      try {
        get();
      } catch (e) {
        error = e;
      }

      expect(error).toBeUndefined();
    });

    it('should allow to get a default value when nested property is not ' +
      'found', () => {
      const foo = { bar: 'test' };
      expect(get(foo, 'bar.stuff', 'thing')).toBe('thing');
    });
  });
});
