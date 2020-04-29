export { getConfig, setConfig } from './config';

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
  getPaymentMethods,
  createPaymentIntent,
} from './payments';

export {
  getProducts,
  getProduct,
} from './products';

export {
  getShippingMethods,
} from './shipping';
