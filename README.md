# a-cachify

[![NPM Version][npm-version-image]][npm-url]
[![LICENSE][license-image]][license-url]
[![Build Status][travis-image]][travis-url]
[![dependencies Status][dependencies-image]][dependencies-url]
[![devDependencies Status][devDependencies-image]][devDependencies-url]

Easily add a cache layer to any function.

## Installation

```sh
npm install a-cachify
```

## Usages

```js
const {cachify, join} = require('a-cachify');
const Cache = require('cache-module');
const cache = new Cache();

let doSomething = function (arg1, arg2) {
  result = heavyWork(arg1, arg2);
  return result;
}

// Add a cache layer
doSomething = cachify(cache, doSomething, join);

doSomething(1, 2);
doSomething(1, 2); // return the cached result
```

## API

### cachify (cache, fn [ , keyMaker ] [ , thisArg ])
add a cache layer to the function.

### apply (cache)

### wrap (cache)

### join

### joinN

## License
Copyright (c) 2019 [dailyrandomphoto][my-url]. Licensed under the [MIT license][license-url].

[my-url]: https://github.com/dailyrandomphoto
[npm-url]: https://www.npmjs.com/package/a-cachify
[travis-url]: https://travis-ci.org/dailyrandomphoto/a-cachify
[coveralls-url]: https://coveralls.io/github/dailyrandomphoto/a-cachify?branch=master
[license-url]: LICENSE
[dependencies-url]: https://david-dm.org/dailyrandomphoto/a-cachify
[devDependencies-url]: https://david-dm.org/dailyrandomphoto/a-cachify?type=dev

[npm-downloads-image]: https://img.shields.io/npm/dm/a-cachify
[npm-version-image]: https://img.shields.io/npm/v/a-cachify
[license-image]: https://img.shields.io/npm/l/a-cachify
[travis-image]: https://img.shields.io/travis/dailyrandomphoto/a-cachify
[coveralls-image]: https://img.shields.io/coveralls/github/dailyrandomphoto/a-cachify
[dependencies-image]: https://img.shields.io/david/dailyrandomphoto/a-cachify
[devDependencies-image]: https://img.shields.io/david/dev/dailyrandomphoto/a-cachify
