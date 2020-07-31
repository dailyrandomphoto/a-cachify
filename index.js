'use strict';

module.exports.join = (...args) => args.join('^');
module.exports.joinN = (n) => (...args) => args.slice(0, n).join('^');

function cachify(cache, fn, keyMaker, thisArg) {
  const applyCache = apply(cache);

  if (typeof fn !== 'function') {
    throw new TypeError(fn + ' is not a function');
  }

  if (typeof keyMaker === 'object') {
    const temporaryValue = thisArg;
    thisArg = keyMaker;
    keyMaker = temporaryValue;
  }

  if (typeof keyMaker !== 'function') {
    keyMaker = (arg1) => arg1;
  }

  return function (...args) {
    const key = Reflect.apply(keyMaker, thisArg || this, args);
    return applyCache(key, () => Reflect.apply(fn, thisArg || this, args));
  };
}

function apply(cache) {
  const { get, set } = wrap(cache);

  return function (key, value) {
    const result = get(key);
    if (result) {
      return result;
    }

    if (typeof value === 'function') {
      value = value();
    }

    set(key, value);
    return value;
  };
}

function wrap(cache) {
  if (!cache) {
    throw new TypeError("argument 'cache' is null or not defined");
  }

  const has =
    typeof cache.has === 'function'
      ? (key) => cache.has(key)
      : (key) => cache.get(key) !== undefined;

  const get = (key) => cache.get(key);

  const set =
    typeof cache.set === 'function'
      ? (key, value) => cache.set(key, value)
      : (key, value) => cache.put(key, value);

  return { has, get, set };
}

module.exports.cachify = cachify;
module.exports.apply = apply;
module.exports.wrap = wrap;
