import { isObject } from '../src/util/is-object';

describe('test/is-object.test.ts', () => {
  it('should be true with json data', () => {
    expect(isObject({})).toEqual(true);
  });

  it('should be true with array data', () => {
    expect(isObject([])).toEqual(true);
  });

  it('should be true with Object instance data', () => {
    // eslint-disable-next-line no-new-object
    expect(isObject(new Object())).toEqual(true);
  });

  it('should be true with Array instance data', () => {
    // eslint-disable-next-line no-new-object
    expect(isObject(new Array(0))).toEqual(true);
  });

  it('should be false with Date instance data', () => {
    expect(isObject(new Date())).toEqual(false);
  });

  it('should be false with arrow function data', () => {
    expect(isObject(() => {})).toEqual(false);
  });

  it('should be false with function data', () => {
    function fn () {}
    expect(isObject(fn)).toEqual(false);
  });

  it('should be false with number data', () => {
    expect(isObject(1)).toEqual(false);
  });

  it('should be false with boolean data', () => {
    expect(isObject(false)).toEqual(false);
  });

  it('should be false with string data', () => {
    expect(isObject('string')).toEqual(false);
  });

  it('should be false with null data', () => {
    expect(isObject(null)).toEqual(false);
  });

  it('should be false with undefined data', () => {
    expect(isObject(undefined)).toEqual(false);
  });

  it('should be false with NaN data', () => {
    expect(isObject(NaN)).toEqual(false);
  });
});
