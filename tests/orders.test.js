import Cookies from 'js-cookie';

import { getOrder, confirmOrder } from '../lib/orders';
import { setConfig, getConfig } from '../lib/config';
import { mockFetch, mockResponse } from './utils/helpers';

describe('orders.js', () => {
  beforeAll(() => {
    setConfig({ clientId: 'test' });
  });

  describe('getOrder(id)', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        order: {
          id: 'order',
          status: 'paid',
        },
      }));
    });

    it('should allow retrieve a particular order', async () => {
      const order = await getOrder('order');
      expect(order.status).toBe('paid');
    });
  });

  describe('confirmOrder(gateway, orderId)', () => {
    const order = { id: 'order', status: 'pending' };

    beforeEach(() => {
      mockFetch(mockResponse(() => {
        order.status = 'paid';

        return { order };
      }));
    });

    it('should allow retrieve a particular order', async () => {
      Cookies.set(getConfig('cookieNames.accessToken'), 'access token');
      const order_ = await confirmOrder('paypal', 'order');
      expect(order_.status).toBe('paid');
      Cookies.remove(getConfig('cookieNames.accessToken'));
    });
  });

});
