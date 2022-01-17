
import {
  getAvailablePaymentGateways,
  createPaymentIntent,
} from '../lib/payments';
import { setConfig } from '../lib/config';
import { mockFetch, mockResponse } from './utils/helpers';

describe('payments.js', () => {
  beforeAll(() => {
    setConfig({ clientId: 'test' });
  });

  describe('getAvailablePaymentGateways()', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        gateways: ['paypal'],
      }));
    });

    it('should allow retrieve a list of available payment ' +
      'gateways', async () => {
      const gateways = await getAvailablePaymentGateways();
      expect(gateways.length).toBe(1);
      expect(gateways[0]).toBe('paypal');
    });
  });

  describe('createPaymentIntent(gateway)', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        orderId: 'order',
        intentId: 'intent',
      }));
    });

    it('should allow to create a new payment intent', async () => {
      const { orderId, intentId } = await createPaymentIntent('paypal');
      expect(orderId).toBe('order');
      expect(intentId).toBe('intent');
    });
  });

});
