import { KeyPathType } from './interface';
import { isObject } from './util/is-object';

const KEY_PATH_TYPE_STRING: KeyPathType = 'string';

function jsonKeyPathStringList (object: any): string[] {
  if (!isObject(object)) {
    return [];
  }
  const keys = Object.keys(object);
  const keyPathArray: string[] = [];
  keys.forEach(key => {
    const item = object[key];
    const subKeyPathArray = jsonKeyPathStringList(item);
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

function jsonKeyPathArrayList (object: any): any[] {
  if (!isObject(object)) {
    return [];
  }
  const keys = Object.keys(object);
  const keyPathArray: any[] = [];
  keys.forEach(key => {
    const item = object[key];
    const subKeyPathArray = jsonKeyPathArrayList(item);
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

/**
 * Creates an array of the own key paths of `object`.
 *
 * @param {any} object The object to query.
 * @returns {Array} Returns the array of key paths.
 */
export function jsonKeyPathList (object: any, keyPathType: KeyPathType = KEY_PATH_TYPE_STRING): any[] {
  if (keyPathType === KEY_PATH_TYPE_STRING) {
    return jsonKeyPathStringList(object);
  }
  return jsonKeyPathArrayList(object);
}
