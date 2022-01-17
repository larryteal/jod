import { jsonKeyPathList, KPOptions } from 'json-key-path-list';
import { KeyPathGroupType, JODOptions } from './interface';
import _ from './lib/custom-lodash';

const KEY_PATH_INTERSECTION_GROUP: KeyPathGroupType = 'intersection';
const KEY_PATH_DELETE_GROUP: KeyPathGroupType = 'delete';

const defaultJODOptions: JODOptions = {
  outputNameMappings: {
    type: 'type',
    path: 'path',
    before: 'before',
    after: 'after'
  },
  outputDiffTypeMappings: {
    replace: 'replace',
    delete: 'delete',
    add: 'add'
  },
  outputDiffKeyPathType: 'string'
};

export function groupKeyPath (oldObj: any, newObj: any, keyPathType: 'string' | 'array' = 'string') {
  const kpOptions: KPOptions = {
    keyPathType,
    nodeType: 'leaf'
  };
  let oldKeyPathList = jsonKeyPathList(oldObj, kpOptions);
  let newKeyPathList = jsonKeyPathList(newObj, kpOptions);
  if (keyPathType === 'array') {
    oldKeyPathList = oldKeyPathList.map((value) => JSON.stringify(value));
    newKeyPathList = newKeyPathList.map((value) => JSON.stringify(value));
  }
  let intersectionKeyPathGroup = _.intersection(oldKeyPathList, newKeyPathList);
  let deleteKeyPathGroup = _.difference(oldKeyPathList, intersectionKeyPathGroup);
  let addKeyPathGroup = _.difference(newKeyPathList, intersectionKeyPathGroup);
  if (keyPathType === 'array') {
    intersectionKeyPathGroup = intersectionKeyPathGroup.map((value) => JSON.parse(value));
    deleteKeyPathGroup = deleteKeyPathGroup.map((value) => JSON.parse(value));
    addKeyPathGroup = addKeyPathGroup.map((value) => JSON.parse(value));
  }

  return { intersectionKeyPathGroup, deleteKeyPathGroup, addKeyPathGroup };
}

export function diffByKeyPathGroup (oldObj: any, newObj: any, keyPathGroup: any[], keyPathGroupType: KeyPathGroupType, options: JODOptions = {}): any[] {
  const jodOptions: JODOptions = _.merge({}, defaultJODOptions, options);
  const diffList: any[] = [];
  const diffType: string = keyPathGroupType === KEY_PATH_INTERSECTION_GROUP
    ? jodOptions.outputDiffTypeMappings!.replace!
    : keyPathGroupType === KEY_PATH_DELETE_GROUP
      ? jodOptions.outputDiffTypeMappings!.delete!
      : jodOptions.outputDiffTypeMappings!.add!;
  keyPathGroup.forEach((path) => {
    const before = _.get(oldObj, path);
    const after = _.get(newObj, path);
    if (diffType !== jodOptions.outputDiffTypeMappings!.replace! || !_.isEqual(before, after)) {
      const customTypeName: string = jodOptions.outputNameMappings!.type!;
      const customPathName: string = jodOptions.outputNameMappings!.path!;
      const customBeforeName: string = jodOptions.outputNameMappings!.before!;
      const customAfterName: string = jodOptions.outputNameMappings!.after!;
      const diffObj: any = {};
      diffObj[customTypeName] = diffType;
      diffObj[customPathName] = path;
      diffObj[customBeforeName] = before;
      diffObj[customAfterName] = after;
      diffList.push(diffObj);
    }
  });
  return diffList;
}

export function jsonDeepDiffList (oldObj: any, newObj: any, options: JODOptions = {}): any[] {
  const jodOptions: JODOptions = _.merge({}, defaultJODOptions, options);
  const { intersectionKeyPathGroup, deleteKeyPathGroup, addKeyPathGroup } = groupKeyPath(oldObj, newObj, jodOptions.outputDiffKeyPathType);
  const diffReplaceList = diffByKeyPathGroup(oldObj, newObj, intersectionKeyPathGroup, 'intersection', jodOptions);
  const diffDeleteList = diffByKeyPathGroup(oldObj, newObj, deleteKeyPathGroup, 'delete', jodOptions);
  const diffAddList = diffByKeyPathGroup(oldObj, newObj, addKeyPathGroup, 'add', jodOptions);
  const diffList: any[] = diffReplaceList.concat(diffDeleteList, diffAddList);
  return diffList;
}
