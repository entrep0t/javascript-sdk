import { getConfig } from './config';
import { request, DEFAULT_LIST_PARAMS } from './http';

export const getShippingMethods = async (params, options = {}) => {
  const { methods, total } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/shipping/methods`,
    qs: {
      ...DEFAULT_LIST_PARAMS,
      ...params,
    },
    ...options,
  });

  return { methods, total };
};
