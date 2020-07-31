# a-cachify

[![NPM Version][npm-version-image]][npm-url]
[![LICENSE][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![code style: prettier][code-style-prettier-image]][code-style-prettier-url]

Easily add a cache layer to any function.

## Installation

```sh
npm install a-cachify
```

## Usages

```js
const { cachify, join } = require("a-cachify");
const Cache = require("cache-module");
const cache = new Cache();

let doSomething = function (arg1, arg2) {
  result = heavyWork(arg1, arg2);
  return result;
};

// Add a cache layer
doSomething = cachify(cache, doSomething, join);

doSomething(1, 2);
doSomething(1, 2); // return the cached result
```

## API

### cachify (cache, fn [ , keyMaker ][ , thisarg ])

add a cache layer to the function.

### apply (cache)

### wrap (cache)

### join

### joinN

## License

Copyright (c) 2020 [dailyrandomphoto][my-url]. Licensed under the [MIT license][license-url].

[my-url]: https://github.com/dailyrandomphoto
[npm-url]: https://www.npmjs.com/package/a-cachify
[travis-url]: https://travis-ci.org/dailyrandomphoto/a-cachify
[license-url]: LICENSE
[code-style-prettier-url]: https://github.com/prettier/prettier
[npm-downloads-image]: https://img.shields.io/npm/dm/a-cachify
[npm-version-image]: https://img.shields.io/npm/v/a-cachify
[license-image]: https://img.shields.io/npm/l/a-cachify
[travis-image]: https://img.shields.io/travis/dailyrandomphoto/a-cachify
[code-style-prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
