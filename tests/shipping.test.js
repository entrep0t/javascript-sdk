import {
  getShippingMethods,
} from '../lib/shipping';
import { setConfig } from '../lib/config';

import { mockFetch, mockResponse } from './utils/helpers';

describe('shipping.js', () => {
  beforeAll(() => {
    setConfig({ clientId: 'test' });
  });

  describe('getShippingMethods(params)', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        methods: [{
          id: 'usps',
          name: 'USPS',
        }],
        total: 1,
      }));
    });

    it('should allow retrieve a list of products', async () => {
      const { methods, total } = await getShippingMethods();
      expect(methods.length).toBe(total);
      expect(methods[0].name).toBe('USPS');
    });
  });

});
