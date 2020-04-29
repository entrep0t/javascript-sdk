import { getConfig } from './config';
import { request, DEFAULT_LIST_PARAMS } from './http';

export const getPaymentMethods = async (params, options = {}) => {
  const { methods } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/payments/gateways`,
    qs: {
      ...DEFAULT_LIST_PARAMS,
      ...params,
    },
    ...options,
  });

  return methods;
};

export const createPaymentIntent = async (gateway, options = {}) => {
  const { orderId, intentId } = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/payments/${gateway}/intent`,
    ...options,
  });

  return { orderId, intentId };
};
