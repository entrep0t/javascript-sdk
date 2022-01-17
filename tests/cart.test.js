import Cookies from 'js-cookie';

import {
  getCart,
  addCartItem,
  pullCartItem,
  removeCartItem,
  applyCoupon,
  setCartAddress,
  setCartShipping,
} from '../lib/cart';
import { setConfig, getConfig } from '../lib/config';
import { mockFetch, mockResponse } from './utils/helpers';

describe('cart.js', () => {
  beforeAll(() => {
    setConfig({ clientId: 'test' });
  });

  describe('getCart()', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        cart: {
          content: [{
            product: { id: 'product', name: 'Test product', price: 1000 },
            quantity: 1,
          }],
        },
      }));
    });

    it('should allow to get a cart for the current session', async () => {
      const cart = await getCart();
      expect(cart.content[0].product.name).toBe('Test product');
    });
  });

  describe('addCartItem(productId, variationId)', () => {
    const cart = {
      content: [{
        product: { id: 'product', name: 'Test product', price: 1000 },
        quantity: 1,
      }],
    };

    beforeEach(() => {
      mockFetch(mockResponse(({ rawBody }) => {
        cart.content[0].quantity += rawBody.quantity;

        return { cart };
      }));
    });

    it('should allow to add an item in the cart', async () => {
      const cart_ = await addCartItem('product');
      expect(cart_.content[0].quantity).toBe(2);
    });
  });

  describe('pullCartItem(productId, variationId)', () => {
    const cart = {
      content: [{
        product: { id: 'product', name: 'Test product', price: 1000 },
        quantity: 2,
      }],
    };

    beforeEach(() => {
      mockFetch(mockResponse(({ rawBody }) => {
        cart.content[0].quantity -= rawBody.quantity;

        return { cart };
      }));
    });

    it('should allow to pull an item from the cart', async () => {
      const cart_ = await pullCartItem('product');
      expect(cart_.content[0].quantity).toBe(1);
    });
  });

  describe('removeCartItem(productId, variationId)', () => {
    const cart = {
      content: [{
        product: { id: 'product', name: 'Test product', price: 1000 },
        quantity: 2,
      }],
    };

    beforeEach(() => {
      mockFetch(mockResponse(({ rawBody }) => {
        if (rawBody.quantity === 0) {
          delete cart.content[0];
        }

        return { cart };
      }));
    });

    it('should allow to completely remove an item from the cart', async () => {
      const cart_ = await removeCartItem('product');
      expect(cart_.content[0]).toBe(undefined);
    });
  });

  describe('applyCoupon(coupon)', () => {
    const cart = {
      coupons: [],
    };

    beforeEach(() => {
      mockFetch(mockResponse(() => {
        cart.coupons.push({ id: 'coupon', name: 'coupon', value: 500 });

        return { cart };
      }));
    });

    it('should allow apply a coupon on the current cart', async () => {
      const cart_ = await applyCoupon('coupon');
      expect(cart_.coupons[0].id).toBe('coupon');
    });
  });

  describe('setCartAddress(address)', () => {
    const cart = {
      shippingAddress: null,
    };

    beforeEach(() => {
      mockFetch(mockResponse(({ rawBody }) => {
        cart.shippingAddress = {
          ...rawBody.address,
        };

        return { cart };
      }));
    });

    it('should allow to add a shipping address to the current ' +
      'cart', async () => {
      const cart_ = await setCartAddress({
        firstName: 'John',
        lastName: 'Doe',
      });
      expect(cart_.shippingAddress.firstName).toBe('John');
    });
  });

  describe('setCartShipping(method, region)', () => {
    const cart = {
      shippingMethod: null,
    };

    beforeEach(() => {
      mockFetch(mockResponse(() => {
        cart.shippingMethod = {
          id: 'method',
          name: 'USPS',
        };

        return { cart };
      }));
    });

    it('should allow to set the shipping method for the current ' +
      'cart', async () => {
      const cart_ = await setCartShipping('method', 'world');
      expect(cart_.shippingMethod.name).toBe('USPS');
    });
  });

  afterAll(() => {
    Cookies.remove(getConfig('cookieNames.sessionId'));
  });
});
