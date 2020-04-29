import { getConfig } from './config';
import { request, DEFAULT_LIST_PARAMS } from './http';

export const getCategories = async (params, options = {}) => {
  const { products } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/categories`,
    qs: {
      ...DEFAULT_LIST_PARAMS,
      ...params,
    },
    ...options,
  });

  return products;
};

export const getCategory = async (slugOrId, options = {}) => {
  const { product } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/categories/${slugOrId}`,
    ...options,
  });

  return product;
};
