import { isObject } from './util/is-object';

export function jsonLeafNodeKeyPathStringList (object: any): string[] {
  if (!isObject(object)) {
    return [];
  }
  const keys = Object.keys(object);
  const keyPathArray: string[] = [];
  keys.forEach(key => {
    const item = object[key];
    const subKeyPathArray = jsonLeafNodeKeyPathStringList(item);
    if (subKeyPathArray.length > 0) {
      subKeyPathArray.forEach(sp => {
        keyPathArray.push(`${key}.${sp}`);
      });
    } else {
      keyPathArray.push(key);
    }
  });
  return keyPathArray;
}
