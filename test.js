'use strict';

const { expect } = require('chai');
const { cachify, join, joinN, wrap, apply } = require('a-cachify');

class Cache {
  constructor() {
    this.cache = {};
  }

  put(id, value) {
    this.cache[id] = value;
  }

  get(id) {
    return this.cache[id];
  }
}

class Cache2 {
  constructor() {
    this.cache = {};
  }

  set(id, value) {
    this.cache[id] = value;
  }

  has(id) {
    return typeof this.cache[id] !== 'undefined';
  }

  get(id) {
    return this.cache[id];
  }
}

describe('a-cachify', () => {
  let x = 0;
  const myFunc = function (input) {
    return ++x + input;
  };

  const cacheInstances = [new Cache(), new Cache2()];

  cacheInstances.forEach((cache, i) => {
    describe(`wrap - ${i}`, () => {
      it('default', () => {
        const cache2 = wrap(cache);
        cache2.set('foo', 'hello');
        expect(cache2.has('foo')).to.be.eql(true);
        expect(cache2.get('foo')).to.be.eql('hello');
      });

      it('destructuring', () => {
        const { get, set, has } = wrap(cache);
        set('bar', 'hi');
        expect(has('bar')).to.be.eql(true);
        expect(get('bar')).to.be.eql('hi');
      });
    });

    describe(`apply - ${i}`, () => {
      before(() => {
        x = 0;
      });

      it('default', () => {
        const cacheApply = apply(cache);
        expect(cache.get('apply-1')).to.be.eql(undefined);
        expect(cacheApply('apply-1', 'foo')).to.be.eql('foo');
        expect(cacheApply('apply-1', 'foo')).to.be.eql('foo'); // get again
        expect(cache.get('apply-1')).to.be.eql('foo');
      });

      it('function', () => {
        const cacheApply = apply(cache);
        expect(cache.get('apply-2')).to.be.eql(undefined);
        expect(cacheApply('apply-2', () => myFunc('bar'))).to.be.eql('1bar');
        expect(cacheApply('apply-2', () => 'foo')).to.be.eql('1bar'); // get again
        expect(cache.get('apply-2')).to.be.eql('1bar');
      });
    });

    describe(`cachify - ${i}`, () => {
      before(() => {
        x = 0;
      });

      it('default key', () => {
        const myFuncCached = cachify(cache, myFunc);
        const result = myFuncCached(1);

        expect(myFuncCached(1)).to.be.eql(result);
        expect(myFuncCached(2)).to.be.not.eql(result);
        expect(cache.get(1)).to.be.eql(result);
        expect(x).to.be.eql(2);
      });

      it('use a custom key', () => {
        const keyMaker = (a, b) => a + '-' + b;
        const myFuncCached = cachify(cache, myFunc, keyMaker);
        const result = myFuncCached(1, 2);

        expect(myFuncCached(1, 2)).to.be.eql(result);
        expect(myFuncCached(1, 3)).to.be.not.eql(result);
        expect(cache.get(keyMaker(1, 2))).to.be.eql(result);
      });

      it('use join', () => {
        const myFuncCached = cachify(cache, myFunc, join);
        const result = myFuncCached(1, 2);

        expect(myFuncCached(1, 2)).to.be.eql(result);
        expect(myFuncCached(1, 3)).to.be.not.eql(result);
        expect(cache.get(join(1, 2))).to.be.eql(result);
      });

      it('use joinN', () => {
        const myFuncCached = cachify(cache, myFunc, joinN(2));
        const result = myFuncCached(1, 2, 3);

        expect(myFuncCached(1, 2, 4)).to.be.eql(result);
        expect(myFuncCached(1, 2)).to.be.eql(result);
        expect(myFuncCached(1, 3, 2)).to.be.not.eql(result);
        expect(cache.get(joinN(2)(1, 2))).to.be.eql(result);
      });
    });
  });
});
