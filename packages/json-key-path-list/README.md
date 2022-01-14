# json-key-path-list
Creates an array of the own key paths of `Object` or `Array`.

# Customizable output results and formats

## Two path modes
  - Only leaf node paths (default)
  - All node paths

## Two output formats
  - String (default)
  - Array
  ```js
  // Data
  { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } }

  // Only leaf node paths
  // String
  [ 'foo', 'bar', 'cc.foo', 'cc.bar' ]

  // Array
  [ ['foo'], ['bar'], ['cc', 'foo'], ['cc', 'bar'] ]

  // All node paths
  // String
  [ 'foo', 'bar', 'cc', 'cc.foo', 'cc.bar' ]

  // Array
  [ [ 'foo' ], [ 'bar' ], [ 'cc', 'foo' ], [ 'cc', 'bar' ] ]
  ```

# Install
```bash
npm i json-key-path-list
```

# Usage

## TypeScript
```ts
// default
import { jsonKeyPathList } from 'json-key-path-list';

const data = { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } };
const keyPaths = jsonKeyPathList(data);

console.log(keyPaths);
// [ 'foo', 'bar', 'cc.foo', 'cc.bar' ]
```

## JavaScript
```js
// default
const { jsonKeyPathList } = require('json-key-path-list');

const data = { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } };
const keyPaths = jsonKeyPathList(data);

console.log(keyPaths);
// [ 'foo', 'bar', 'cc.foo', 'cc.bar' ]
```

# Options
  - nodeType `leaf` or `all`, default is `leaf`
  - keyPathType `string` or `array`, default is `string`

## All node paths
```ts
import { jsonKeyPathList } from 'json-key-path-list';

const data = { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } };
const options: KPOptions = {
  nodeType: 'all'
};
const keyPaths = jsonKeyPathList(data, options);

console.log(keyPaths);
// [ 'foo', 'bar', 'cc', 'cc.foo', 'cc.bar' ]
```

## Array format paths
```ts
import { jsonKeyPathList } from 'json-key-path-list';

const data = { foo: 'foo', bar: 'bar', cc: { foo: 'foo', bar: 'bar' } };
const options: KPOptions = {
  keyPathType: 'array'
};
const keyPaths = jsonKeyPathList(data, options);

console.log(keyPaths);
// [ [ 'foo' ], [ 'bar' ], [ 'cc', 'foo' ], [ 'cc', 'bar' ] ]
```

## Pay attention to the output format
If you are not sure if there is a special key, it is better to use the output in `array` format
```ts
import { jsonKeyPathList } from 'json-key-path-list';

const data = { 'foo.bar': 'foobar', foo: { bar: 'foobar' } };
const options: KPOptions = { keyPathType: 'array' };
let keyPaths = jsonKeyPathList(data, options);
console.log(keyPaths);
// [ [ 'foo.bar' ], [ 'foo', 'bar' ] ]

options.keyPathType = 'string';
keyPaths = jsonKeyPathList(data, options);
console.log(keyPaths);
// [ 'foo.bar', 'foo.bar' ]
``` 

# Good luck