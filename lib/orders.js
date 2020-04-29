import { getConfig } from './config';
import { requestWithRetry } from './http';

export const getOrder = async (id, options = {}) => {
  const { order } = await requestWithRetry({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/orders/${id}`,
    ...options,
  });

  return order;
};

export const confirmOrder = async (gateway, orderId, options = {}) => {
  const { order } = await requestWithRetry({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/payments/${gateway}` +
      `/intent/confirm/${orderId}`,
    ...options,
  });

  return order;
};
