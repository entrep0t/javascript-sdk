import { getConfig } from './config';
import { request, DEFAULT_LIST_PARAMS } from './http';

export const getProducts = async (params, options = {}) => {
  const { products } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/products`,
    qs: {
      ...DEFAULT_LIST_PARAMS,
      ...params,
    },
    ...options,
  });

  return products;
};

export const getProduct = async (slugOrId, options = {}) => {
  const { product } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/products/${slugOrId}`,
    ...options,
  });

  return product;
};
