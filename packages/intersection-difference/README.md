# `intersection-difference`

> Generate intersection and difference at the same time, Simple and efficient

## Usage

```ts
import { intersectionAndDifference } from 'intersection-difference';
// const { intersectionAndDifference } = require('intersection-difference');

// Elements must be strings and cannot have duplicate elements(string set)
const setA = ['aa', 'bb', 'cc', 'dd']; 
const setB = ['cc', 'dd', 'ee', 'ff'];
const result = intersectionAndDifference(setA, setB);
console.log(result);
// [['aa', 'bb'], ['ee', 'ff'], ['cc', 'dd']]
// The last string array in result is the intersection, 
// the others are the difference between each set and the intersection
```

```ts
import { intersectionAndDifference } from 'intersection-difference';
// const { intersectionAndDifference } = require('intersection-difference');

const setA = new Set(['aa', 'bb', 'cc', 'dd']);
const setB = new Set(['cc', 'dd', 'ee', 'ff']);
const result = intersectionAndDifference(setA, setB);
console.log(result);
// [['aa', 'bb'], ['ee', 'ff'], ['cc', 'dd']]
// The last string array in result is the intersection, 
// the others are the difference between each set and the intersection
```
