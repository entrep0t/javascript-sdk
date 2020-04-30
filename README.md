# Entrepot

Entrepot SDK for Node &amp; the browser 🚀


## Installation

```
yarn add entrepot-sdk
```

### Optional dependencies

As this sdk relies on `fetch`, we added `isomorphic-fetch` as an optional dependency and strongly suggest adding it to your project or polyfill the `fetch` utility using your own method if necessary.


## Usage

```javascript
import { setConfig, getProducts } from 'entrepot-sdk';

setConfig({ clientId: 'yourClientId' });
getProducts().then(products => console.log(products));
```


## [Documentation](https://entrepot.dev/docs/sdk/javascript)

https://entrepot.dev/docs/sdk/javascript


## IE Compatibility

As part of a global effort to deprecate Internet Explorer, we decided not to include IE polyfills by default.
You can still manually import a version containing all the necessary polyfills for IE >= 11:

```javascript
import * as entrepot from 'entrepot-sdk/dist/ie/entrepot.esm.js';
```

Please note that this build will probably add more than 150kb to your final bundle.


## Contributing

Please check the [CONTRIBUTING.md](https://github.com/entrep0t/javascript-sdk/blob/master/CONTRIBUTING.md) doc for contribution guidelines.


## Development

Install dependencies:

```bash
yarn install
```

Run examples at http://localhost:62000/ with webpack dev server:

```bash
yarn serve
```

And test your code:

```bash
yarn test
```


## License

This software is licensed under [MIT](https://github.com/entrep0t/javascript-sdk/blob/master/LICENSE).


## Contributors

<!-- Contributors START
Ugo_Stephant dackmin https://ugostephant.io code doc tools
Contributors END -->
<!-- Contributors table START -->
| <img src="https://avatars.githubusercontent.com/dackmin?s=100" width="100" alt="Ugo Stephant" /><br />[<sub>Ugo Stephant</sub>](https://github.com/dackmin)<br />[💻](https://github.com/entrep0t/javascript-sdk/commits?author=dackmin) [📖](https://github.com/entrep0t/javascript-sdk/commits?author=dackmin) 🔧 |
| :---: |
<!-- Contributors table END -->
