import { KPOptions } from './interface';
import { jsonAllNodeKeyPathArrayList } from './json-all-node-key-path-array-list';
import { jsonAllNodeKeyPathStringList } from './json-all-node-key-path-string-list';
import { jsonLeafNodeKeyPathArrayList } from './json-leaf-node-key-path-array-list';
import { jsonLeafNodeKeyPathStringList } from './json-leaf-node-key-path-string-list';

const defaultKPOptions: KPOptions = {
  keyPathType: 'string',
  nodeType: 'leaf'
};

// function mapping
const FNS = {
  leaf_string: jsonLeafNodeKeyPathStringList,
  leaf_array: jsonLeafNodeKeyPathArrayList,
  all_string: jsonAllNodeKeyPathStringList,
  all_array: jsonAllNodeKeyPathArrayList
};

/**
 * Creates an array of the own key paths of `object`.
 *
 * @param {any} object The object to query.
 * @param {KPOptions} options The options to custom output.
 * @returns {Array} Returns the array of key paths.
 */
export function jsonKeyPathList (object: any, options: KPOptions = {}): any[] {
  const kpOptions: KPOptions = {
    keyPathType: options.keyPathType || defaultKPOptions.keyPathType,
    nodeType: options.nodeType || defaultKPOptions.nodeType
  };
  return FNS[`${kpOptions.nodeType!}_${kpOptions.keyPathType!}`](object);
}
