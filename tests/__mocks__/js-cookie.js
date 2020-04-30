const store = {};

export default {
  get: k => store[k],
  set: (k, v) => { store[k] = v; },
  remove: k => { delete store[k]; },
};
