import { isObject } from './util/is-object';

export function jsonLeafNodeKeyPathArrayList (object: any): any[] {
  if (!isObject(object)) {
    return [];
  }
  const keys = Object.keys(object);
  const keyPathArray: any[] = [];
  keys.forEach(key => {
    const item = object[key];
    const subKeyPathArray = jsonLeafNodeKeyPathArrayList(item);
    if (subKeyPathArray.length > 0) {
      subKeyPathArray.forEach(sp => {
        keyPathArray.push([key].concat(sp));
      });
    } else {
      keyPathArray.push([key]);
    }
  });
  return keyPathArray;
}
