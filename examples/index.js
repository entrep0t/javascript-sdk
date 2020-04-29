import { setConfig, getProducts, getProduct } from '@entrep0t/sdk';

const dump = (selector, results) => {
  document.querySelector(selector).innerHTML = JSON.stringify(results, null, 2);
};

const REVERSED = { sort: 'createdAt:1' };

(async () => {
  setConfig({
    clientId: '8713857137206140',
    apiUrl: 'https://api.entrepot.local:10000/api/v1',
  });

  dump('#products', await getProducts());
  dump('#products-reverse', await getProducts(REVERSED));
  dump('#products-filtered', await getProducts({
    filter: 'categories:colliers,bracelets',
  }));
  dump('#products-single', await getProduct('collier-lys'));
})();
