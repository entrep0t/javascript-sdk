import { getConfig } from './config';
import { request } from './http';

export const getAvailablePaymentGateways = async (options = {}) => {
  const { gateways } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/payments/gateways`,
    ...options,
  });

  return gateways;
};

export const createPaymentIntent = async (gateway, options = {}) => {
  const { orderId, intentId } = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/payments/${gateway}/intent`,
    ...options,
  });

  return { orderId, intentId };
};
