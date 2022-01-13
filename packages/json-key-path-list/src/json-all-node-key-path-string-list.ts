import { isObject } from './util/is-object';

export function jsonAllNodeKeyPathStringList (object: any): string[] {
  if (!isObject(object)) {
    return [];
  }
  const keys = Object.keys(object);
  const keyPathArray: string[] = [];
  keys.forEach(key => {
    keyPathArray.push(key);
    const item = object[key];
    const subKeyPathArray = jsonAllNodeKeyPathStringList(item);
    subKeyPathArray.forEach(sp => {
      keyPathArray.push(`${key}.${sp}`);
    });
  });
  return keyPathArray;
}
