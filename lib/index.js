export { setConfig } from './config';

export {
  authenticate,
  me,
  register,
} from './auth';

export {
  getCart,
  addCartItem,
  pullCartItem,
  removeCartItem,
  applyCoupon,
  setCartAddress,
  setCartShipping,
} from './cart';

export {
  getCategories,
  getCategory,
} from './categories';

export {
  getOrder,
  confirmOrder,
} from './orders';

export {
  getAvailablePaymentGateways,
  createPaymentIntent,
} from './payments';

export {
  getProducts,
  getProduct,
} from './products';

export {
  getShippingMethods,
} from './shipping';
