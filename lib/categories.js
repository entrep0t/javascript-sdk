import { getConfig } from './config';
import { request, DEFAULT_LIST_PARAMS } from './http';

export const getCategories = async (params = {}, options = {}) => {
  const { categories, total } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/categories`,
    qs: {
      ...DEFAULT_LIST_PARAMS,
      ...params,
    },
    ...options,
  });

  return { categories, total };
};

export const getCategory = async (slugOrId, options = {}) => {
  const { category } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/categories/${slugOrId}`,
    ...options,
  });

  return category;
};
