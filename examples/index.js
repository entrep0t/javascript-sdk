import { setConfig, getProducts, getProduct } from 'entrepot-sdk';

const dump = (selector, results) => {
  document.querySelector(selector).innerHTML = JSON.stringify(results, null, 2);
};

const REVERSED = { sort: 'createdAt:1' };

(async () => {
  setConfig({
    clientId: '8713857137206140',
  });

  dump('#products', await getProducts());
  dump('#products-reverse', await getProducts(REVERSED));
  dump('#products-filtered', await getProducts({
    filter: 'categories:colliers,bracelets',
  }));
  dump('#products-single', await getProduct('collier-lys'));
})();
