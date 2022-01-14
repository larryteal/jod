# json-deep-diff-list
Creates an array of two json object diff.

# Customizable output results and formats
  - The `key name` of the output result can be freely customized.
    - Defaults are `type`, `path`, `before`, `after`.
  - The difference `type` of the output result can be freely customized.
    - Defaults are `replace`, `delete`, `add`.
  - The difference `path` of the output result can be set to `array` or `string` format.
    - Default is `string`.
  ```js
  // default output format
  [
    { type: 'replace', path: 'foo', before: 'foo', after: 'FOO' },
    { type: 'delete', path: 'bar', before: 'bar', after: undefined },
    { type: 'add', path: 'car', before: undefined, after: 'car' },
  ]
  ```
  ```js
  // custom key name 
  // type --> t, path --> p, before --> b, after --> a
  [
    { t: 'replace', p: 'foo', b: 'foo', a: 'FOO' },
    { t: 'delete', p: 'bar', b: 'bar', a: undefined },
    { t: 'add', p: 'car', b: undefined, a: 'car' },
  ]
  ```
  ```js
  // custom type
  // replace --> r, delete --> d, add --> a
  [
    { type: 'r', path: 'foo', before: 'foo', after: 'FOO' },
    { type: 'd', path: 'bar', before: 'bar', after: undefined },
    { type: 'a', path: 'car', before: undefined, after: 'car' },
  ]
  ```
  ```js
  // custom path format
  // array format
  [
    { type: 'replace', path: ['foo'], before: 'foo', after: 'FOO' },
    { type: 'delete', path: ['bar'], before: 'bar', after: undefined },
    { type: 'add', path: ['car'], before: undefined, after: 'car' },
  ]
  ```

# How it works
  - Get the path of each leaf node of the JSON object
  - Take the intersection of the leaf node paths of two JSON objects
  - Take the difference between the leaf node paths of the first JSON object and the intersection to get the deleted set
  - Take the difference between the leaf node paths of the second JSON object and the intersection to get the new set
  - Process intersection and difference and generate final diff results
  ```
  A  is set of first JSON object
  B  is set of second JSON object
  C = A ∩ B  intersection of A and B
  D = A - C  deleted set
  E = B - C  new set
  ```

# Install
```bash
npm i json-deep-diff-list
```

# Usage

## TypeScript
```ts
import { jsonDeepDiffList } from 'json-deep-diff-list';

const dataOld = { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } };
const dataNew = { foo: 'FOO', car: 'car', cc: { foo: 'Foo', car: 'car' } };

const diffResult = jsonDeepDiffList(dataOld, dataNew);

console.log(diffResult);
// [
//   { type: 'replace', path: 'foo', before: 'foo', after: 'FOO' },
//   { type: 'replace', path: 'cc.foo', before: 'foo', after: 'Foo' },
//   { type: 'delete', path: 'bar', before: 'bar', after: undefined },
//   { type: 'delete', path: 'cc.bar', before: 'bar', after: undefined },
//   { type: 'add', path: 'car', before: undefined, after: 'car' },
//   { type: 'add', path: 'cc.car', before: undefined, after: 'car' }
// ]
```
## JavaScript
```js
const { jsonDeepDiffList } = require('json-deep-diff-list');

const dataOld = { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } };
const dataNew = { foo: 'FOO', car: 'car', cc: { foo: 'Foo', car: 'car' } };

const diffResult = jsonDeepDiffList(dataOld, dataNew);

console.log(diffResult);
// [
//   { type: 'replace', path: 'foo', before: 'foo', after: 'FOO' },
//   { type: 'replace', path: 'cc.foo', before: 'foo', after: 'Foo' },
//   { type: 'delete', path: 'bar', before: 'bar', after: undefined },
//   { type: 'delete', path: 'cc.bar', before: 'bar', after: undefined },
//   { type: 'add', path: 'car', before: undefined, after: 'car' },
//   { type: 'add', path: 'cc.car', before: undefined, after: 'car' }
// ]
```

# Options
  - `outputNameMappings` Custom output key name
    - `type` Any string
    - `path` Any string
    - `before` Any string
    - `after` Any string
  - `outputDiffTypeMappings` Custom output type name
    - `replace` Any string
    - `delete` Any string
    - `add` Any string
  - `outputDiffKeyPathType` Custom output path format
    - Can be set to `string` or `array`

##  Custom output key name
```ts
import { JODOptions, jsonDeepDiffList } from 'json-deep-diff-list';

const dataOld = { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } };
const dataNew = { foo: 'FOO', car: 'car', cc: { foo: 'Foo', car: 'car' } };
const options: JODOptions = {
  outputNameMappings: {
    type: 't',
    path: 'p',
    before: 'b',
    after: 'a'
  }
};
const diffResult = jsonDeepDiffList(dataOld, dataNew, options);

console.log(diffResult);
// [
//   { t: 'replace', p: 'foo', b: 'foo', a: 'FOO' },
//   { t: 'replace', p: 'cc.foo', b: 'foo', a: 'Foo' },
//   { t: 'delete', p: 'bar', b: 'bar', a: undefined },
//   { t: 'delete', p: 'cc.bar', b: 'bar', a: undefined },
//   { t: 'add', p: 'car', b: undefined, a: 'car' },
//   { t: 'add', p: 'cc.car', b: undefined, a: 'car' }
// ]
```
## Custom output type name
```ts
import { JODOptions, jsonDeepDiffList } from 'json-deep-diff-list';

const dataOld = { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } };
const dataNew = { foo: 'FOO', car: 'car', cc: { foo: 'Foo', car: 'car' } };
const options: JODOptions = {
  outputDiffTypeMappings: {
    replace: 'r',
    delete: 'd',
    add: 'a'
  }
};
const diffResult = jsonDeepDiffList(dataOld, dataNew, options);

console.log(diffResult);
// [
//   { type: 'r', path: 'foo', before: 'foo', after: 'FOO' },    
//   { type: 'r', path: 'cc.foo', before: 'foo', after: 'Foo' }, 
//   { type: 'd', path: 'bar', before: 'bar', after: undefined },
//   { type: 'd', path: 'cc.bar', before: 'bar', after: undefined },
//   { type: 'a', path: 'car', before: undefined, after: 'car' },
//   { type: 'a', path: 'cc.car', before: undefined, after: 'car' }
// ]
```

## Custom output path format
```ts
import { JODOptions, jsonDeepDiffList } from 'json-deep-diff-list';

const dataOld = { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } };
const dataNew = { foo: 'FOO', car: 'car', cc: { foo: 'Foo', car: 'car' } };
const options: JODOptions = {
  outputDiffKeyPathType: 'array'
};
const diffResult = jsonDeepDiffList(dataOld, dataNew, options);

console.log(diffResult);
// [
//   { type: 'replace', path: [ 'foo' ], before: 'foo', after: 'FOO' },
//   { type: 'replace', path: [ 'cc', 'foo' ], before: 'foo', after: 'Foo'},
//   { type: 'delete', path: [ 'bar' ], before: 'bar', after: undefined },
//   { type: 'delete', path: [ 'cc', 'bar' ], before: 'bar', after: undefined },
//   { type: 'add', path: [ 'car' ], before: undefined, after: 'car' },
//   { type: 'add', path: [ 'cc', 'car' ], before: undefined, after: 'car'}
// ]
```

# Others

## Pay attention to some special keys
The key contains a dot, such as 'foo.bar', the `outputDiffKeyPathType` of options should be set to `array` to ensure accuracy.
```ts
const dataOld = { 'foo.bar': 'foobar', foo: { bar: 'foobar' } };
const dataNew = { 'foo.bar': 'Foobar', foo: { bar: 'FOOBAR' } };
const options: JODOptions = {
  outputDiffKeyPathType: 'array'
};
const diffResult = jsonDeepDiffList(dataOld, dataNew, options);

console.log(diffResult);
// [
//   { type: 'replace', path: [ 'foo.bar' ], before: 'foobar', after: 'Foobar' },
//   { type: 'replace', path: [ 'foo', 'bar' ], before: 'foobar', after: 'FOOBAR' }
// ]
```

## Secondary functions
  - groupKeyPath ----  Generate sets of  `intersection`, `deleted` and `new`
  - diffByKeyPathGroup ---- Handle one of `intersection`, `deleted set` and `new set`
```ts
// groupKeyPath 
import { groupKeyPath } from 'json-deep-diff-list';

const dataOld = { foo: 'foo', bar: 'bar', car: 'car', cc: { foo: 'foo', bar: 'bar', car: 'car' } };
const dataNew = { foo: 'foo', bar: 'BAR', xa: 'xa', cc: { foo: 'foo', bar: 'BAR', xa: 'xa' } };
const diffResult = groupKeyPath(dataOld, dataNew);
// The third parameter is the format of the path, 'string' or 'array' default is 'string'
// const diffResult = groupKeyPath(dataOld, dataNew, 'string');
// const diffResult = groupKeyPath(dataOld, dataNew, 'array');

console.log(diffResult);
// {
//   intersectionKeyPathGroup: [ 'foo', 'bar', 'cc.foo', 'cc.bar' ],
//   deleteKeyPathGroup: [ 'car', 'cc.car' ],
//   addKeyPathGroup: [ 'xa', 'cc.xa' ]
// }
```

```ts
// diffByKeyPathGroup
import { diffByKeyPathGroup } from 'json-deep-diff-list';

const dataOld = { foo: 'foo', bar: 'bar', car: 'car', cc: { foo: 'foo', bar: 'bar', car: 'car' } };
const dataNew = { foo: 'foo', bar: 'BAR', xa: 'xa', cc: { foo: 'foo', bar: 'BAR', xa: 'xa' } };
const intersectionKeyPathGroup = ['foo', 'bar', 'cc.foo', 'cc.bar'];
const deleteKeyPathGroup = ['car', 'cc.car'];
const addKeyPathGroup = ['xa', 'cc.xa'];

const diffIntersectionSetResult = diffByKeyPathGroup(dataOld, dataNew, intersectionKeyPathGroup, 'intersection');
const diffDeletedSetResult = diffByKeyPathGroup(dataOld, dataNew, deleteKeyPathGroup, 'delete');
const diffAddSetResult = diffByKeyPathGroup(dataOld, dataNew, addKeyPathGroup, 'add');

console.log(diffIntersectionSetResult);
// [
//   { type: 'replace', path: 'bar', before: 'bar', after: 'BAR' },
//   { type: 'replace', path: 'cc.bar', before: 'bar', after: 'BAR' }
// ]
console.log(diffDeletedSetResult);
// [
//   { type: 'delete', path: 'car', before: 'car', after: undefined },
//   { type: 'delete', path: 'cc.car', before: 'car', after: undefined }
// ]
console.log(diffAddSetResult);
// [
//   { type: 'add', path: 'xa', before: undefined, after: 'xa' },
//   { type: 'add', path: 'cc.xa', before: undefined, after: 'xa' }
// ]
```

# Good luck
