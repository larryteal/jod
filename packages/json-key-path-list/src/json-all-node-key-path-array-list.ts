import { isObject } from './util/is-object';

export function jsonAllNodeKeyPathArrayList (object: any): string[] {
  if (!isObject(object)) {
    return [];
  }
  const keys = Object.keys(object);
  const keyPathArray: any[] = [];
  keys.forEach(key => {
    keyPathArray.push([key]);
    const item = object[key];
    const subKeyPathArray = jsonAllNodeKeyPathArrayList(item);
    subKeyPathArray.forEach(sp => {
      keyPathArray.push([key].concat(sp));
    });
  });
  return keyPathArray;
}
