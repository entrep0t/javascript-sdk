import {
  getCategories,
  getCategory,
} from '../lib/categories';
import { setConfig } from '../lib/config';
import { mockFetch, mockResponse } from './utils/helpers';

describe('categories.js', () => {
  beforeAll(() => {
    setConfig({ clientId: 'test' });
  });

  describe('getCategories(params)', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        categories: [{
          id: 'category',
          name: 'Test category',
        }],
        total: 1,
      }));
    });

    it('should allow retrieve a list of categories', async () => {
      const { categories, total } = await getCategories();
      expect(categories.length).toBe(total);
      expect(categories[0].name).toBe('Test category');
    });
  });

  describe('getCategory(slugOrId)', () => {
    beforeEach(() => {
      mockFetch(mockResponse({
        category: {
          id: 'category',
          name: 'Test category',
        },
      }));
    });

    it('should allow retrieve a particular category', async () => {
      const category = await getCategory('category');
      expect(category.name).toBe('Test category');
    });
  });

});
