import {
  getProducts,
  getProduct,
} from '../lib/products';
import { setConfig } from '../lib/config';

import { mockFetch, mockResponse } from './utils/helpers';

describe('products.js', () => {
  beforeAll(() => {
    setConfig({ clientId: 'test' });
  });

  describe('getProducts(params)', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        products: [{
          id: 'product',
          name: 'Test product',
        }],
        total: 1,
      }));
    });

    it('should allow retrieve a list of products', async () => {
      const { products, total } = await getProducts();
      expect(products.length).toBe(total);
      expect(products[0].name).toBe('Test product');
    });
  });

  describe('getProduct(slugOrId)', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        product: {
          id: 'product',
          name: 'Test product',
        },
      }));
    });

    it('should allow retrieve a particular product', async () => {
      const product = await getProduct('product');
      expect(product.name).toBe('Test product');
    });
  });

});
