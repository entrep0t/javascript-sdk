import { getConfig } from './config';
import { request } from './http';

export const getCart = async (options = {}) => {
  const { cart } = await request({
    method: 'GET',
    url: `${getConfig('apiUrl')}/store/cart`,
    ...options,
  });

  return cart;
};

export const addCartItem = async (productId, variationId, options = {}) => {
  const { cart } = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/cart`,
    body: {
      command: 'add',
      productId,
      variationId,
      quantity: 1,
    },
    ...options,
  });

  return cart;
};

export const pullCartItem = async (productId, variationId, options = {}) => {
  const { cart } = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/cart`,
    body: {
      command: 'remove',
      productId,
      variationId,
      quantity: 1,
    },
    ...options,
  });

  return cart;
};

export const removeCartItem = async (productId, variationId, options = {}) => {
  const { cart } = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/cart`,
    body: {
      command: 'set',
      productId,
      variationId,
      quantity: 0,
    },
    ...options,
  });

  return cart;
};

export const applyCoupon = async (coupon, options = {}) => {
  const { cart } = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/cart/coupon`,
    body: {
      coupon,
    },
    ...options,
  });

  return cart;
};

export const setCartAddress = async (address, options = {}) => {
  const { cart } = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/cart/address`,
    body: {
      address,
    },
    ...options,
  });

  return cart;
};

export const setCartShipping = async (method, region, options = {}) => {
  const { cart } = await request({
    method: 'POST',
    url: `${getConfig('apiUrl')}/store/cart/shipping`,
    body: {
      method,
      region,
    },
    ...options,
  });

  return cart;
};
