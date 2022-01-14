import { diffByKeyPathGroup, groupKeyPath, JODOptions, jsonDeepDiffList } from '../src';

describe('test/json-deep-diff-list.test.ts -- jsonDeepDiffList', () => {
  it('should be correct with json data', () => {
    const oldObj = {
      name: 'old',
      foo: 'foo',
      bar: 'bar',
      xa: [],
      arr: [{
        name: 'old',
        foo: 'foo',
        bar: 'bar',
        xa: []
      }, {
        name: 'old',
        foo: 'foo',
        bar: 'bar',
        xa: []
      }],
      cc: {
        name: 'old',
        foo: 'foo',
        bar: 'bar',
        xa: [],
        arr: [{
          name: 'old',
          foo: 'foo',
          bar: 'bar',
          xa: []
        }, {
          name: 'old',
          foo: 'foo',
          bar: 'bar',
          xa: []
        }]
      }
    };
    const newObj = {
      name: 'new',
      foo: 'foo',
      car: 'car',
      xa: {},
      arr: [{
        name: 'new',
        foo: 'foo',
        car: 'car',
        xa: {}
      }, {
        name: 'new',
        foo: 'foo',
        car: 'car',
        xa: {}
      }, {
        name: 'new',
        foo: 'foo',
        car: 'car',
        xa: {}
      }],
      cc: {
        name: 'new',
        foo: 'foo',
        car: 'car',
        xa: {},
        arr: [{
          name: 'new',
          foo: 'foo',
          car: 'car',
          xa: {}
        }, {
          name: 'new',
          foo: 'foo',
          car: 'car',
          xa: {}
        }, {
          name: 'new',
          foo: 'foo',
          car: 'car',
          xa: {}
        }]
      }
    };
    const expectResult = [
      { type: 'replace', path: 'name', before: 'old', after: 'new' },
      { type: 'replace', path: 'xa', before: [], after: {} },
      { type: 'replace', path: 'arr.0.name', before: 'old', after: 'new' },
      { type: 'replace', path: 'arr.0.xa', before: [], after: {} },
      { type: 'replace', path: 'arr.1.name', before: 'old', after: 'new' },
      { type: 'replace', path: 'arr.1.xa', before: [], after: {} },
      { type: 'replace', path: 'cc.name', before: 'old', after: 'new' },
      { type: 'replace', path: 'cc.xa', before: [], after: {} },
      { type: 'replace', path: 'cc.arr.0.name', before: 'old', after: 'new' },
      { type: 'replace', path: 'cc.arr.0.xa', before: [], after: {} },
      { type: 'replace', path: 'cc.arr.1.name', before: 'old', after: 'new' },
      { type: 'replace', path: 'cc.arr.1.xa', before: [], after: {} },
      { type: 'delete', path: 'bar', before: 'bar', after: undefined },
      { type: 'delete', path: 'arr.0.bar', before: 'bar', after: undefined },
      { type: 'delete', path: 'arr.1.bar', before: 'bar', after: undefined },
      { type: 'delete', path: 'cc.bar', before: 'bar', after: undefined },
      { type: 'delete', path: 'cc.arr.0.bar', before: 'bar', after: undefined },
      { type: 'delete', path: 'cc.arr.1.bar', before: 'bar', after: undefined },
      { type: 'add', path: 'car', before: undefined, after: 'car' },
      { type: 'add', path: 'arr.0.car', before: undefined, after: 'car' },
      { type: 'add', path: 'arr.1.car', before: undefined, after: 'car' },
      { type: 'add', path: 'arr.2.name', before: undefined, after: 'new' },
      { type: 'add', path: 'arr.2.foo', before: undefined, after: 'foo' },
      { type: 'add', path: 'arr.2.car', before: undefined, after: 'car' },
      { type: 'add', path: 'arr.2.xa', before: undefined, after: {} },
      { type: 'add', path: 'cc.car', before: undefined, after: 'car' },
      { type: 'add', path: 'cc.arr.0.car', before: undefined, after: 'car' },
      { type: 'add', path: 'cc.arr.1.car', before: undefined, after: 'car' },
      { type: 'add', path: 'cc.arr.2.name', before: undefined, after: 'new' },
      { type: 'add', path: 'cc.arr.2.foo', before: undefined, after: 'foo' },
      { type: 'add', path: 'cc.arr.2.car', before: undefined, after: 'car' },
      { type: 'add', path: 'cc.arr.2.xa', before: undefined, after: {} }
    ];
    expect(jsonDeepDiffList(oldObj, newObj)).toEqual(expectResult);
  });

  it('should be correct with array data', () => {
    const oldObj = [1, 2, 3];
    const newObj = [1, 4, 5, 6];
    const expectResult = [
      { type: 'replace', path: '1', before: 2, after: 4 },
      { type: 'replace', path: '2', before: 3, after: 5 },
      { type: 'add', path: '3', before: undefined, after: 6 }
    ];
    expect(jsonDeepDiffList(oldObj, newObj)).toEqual(expectResult);
  });

  it('should be correct with non-object data -- undefined undefined', () => {
    const oldObj = undefined;
    const newObj = undefined;
    const expectResult: any[] = [];
    expect(jsonDeepDiffList(oldObj, newObj)).toEqual(expectResult);
  });

  it('should be correct with non-object data -- undefined json', () => {
    const oldObj = undefined;
    const newObj = {
      foo: 'foo',
      bar: 'bar'
    };
    const expectResult = [
      { type: 'add', path: 'foo', before: undefined, after: 'foo' },
      { type: 'add', path: 'bar', before: undefined, after: 'bar' }
    ];
    expect(jsonDeepDiffList(oldObj, newObj)).toEqual(expectResult);
  });

  it('should be correct with non-object data -- json undefined', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar'
    };
    const newObj = undefined;
    const expectResult = [
      { type: 'delete', path: 'foo', before: 'foo', after: undefined },
      { type: 'delete', path: 'bar', before: 'bar', after: undefined }
    ];
    expect(jsonDeepDiffList(oldObj, newObj)).toEqual(expectResult);
  });

  it('should be correct with non-object data -- undefined array', () => {
    const oldObj = undefined;
    const newObj = ['foo', 'bar'];
    const expectResult = [
      { type: 'add', path: '0', before: undefined, after: 'foo' },
      { type: 'add', path: '1', before: undefined, after: 'bar' }
    ];
    expect(jsonDeepDiffList(oldObj, newObj)).toEqual(expectResult);
  });

  it('should be correct with non-object data -- array undefined', () => {
    const oldObj = ['foo', 'bar'];
    const newObj = undefined;
    const expectResult = [
      { type: 'delete', path: '0', before: 'foo', after: undefined },
      { type: 'delete', path: '1', before: 'bar', after: undefined }
    ];
    expect(jsonDeepDiffList(oldObj, newObj)).toEqual(expectResult);
  });

  it('should be correct with json sub item undefined data', () => {
    const oldObj = {
      foo: undefined,
      bar: 'bar',
      car: undefined,
      cc: {
        foo: undefined,
        bar: 'bar',
        car: undefined
      }
    };
    const newObj = {
      foo: 'foo',
      bar: undefined,
      xa: undefined,
      cc: {
        foo: 'foo',
        bar: undefined,
        xa: undefined
      }
    };
    const expectResult = [
      { type: 'replace', path: 'foo', before: undefined, after: 'foo' },
      { type: 'replace', path: 'bar', before: 'bar', after: undefined },
      { type: 'replace', path: 'cc.foo', before: undefined, after: 'foo' },
      { type: 'replace', path: 'cc.bar', before: 'bar', after: undefined },
      { type: 'delete', path: 'car', before: undefined, after: undefined },
      { type: 'delete', path: 'cc.car', before: undefined, after: undefined },
      { type: 'add', path: 'xa', before: undefined, after: undefined },
      { type: 'add', path: 'cc.xa', before: undefined, after: undefined }
    ];
    expect(jsonDeepDiffList(oldObj, newObj)).toEqual(expectResult);
  });

  it('should be correct when custom output fromat -- outputNameMappings', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const expectResult = [
      { t: 'replace', p: 'bar', b: 'bar', a: 'BAR' },
      { t: 'replace', p: 'cc.bar', b: 'bar', a: 'BAR' },
      { t: 'delete', p: 'car', b: 'car', a: undefined },
      { t: 'delete', p: 'cc.car', b: 'car', a: undefined },
      { t: 'add', p: 'xa', b: undefined, a: 'xa' },
      { t: 'add', p: 'cc.xa', b: undefined, a: 'xa' }
    ];
    const optins: JODOptions = {
      outputNameMappings: {
        type: 't',
        path: 'p',
        before: 'b',
        after: 'a'
      }
    };
    expect(jsonDeepDiffList(oldObj, newObj, optins)).toEqual(expectResult);
  });

  it('should be correct when custom output fromat -- outputDiffTypeMappings', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const expectResult = [
      { type: 'rep', path: 'bar', before: 'bar', after: 'BAR' },
      { type: 'rep', path: 'cc.bar', before: 'bar', after: 'BAR' },
      { type: 'del', path: 'car', before: 'car', after: undefined },
      { type: 'del', path: 'cc.car', before: 'car', after: undefined },
      { type: 'add', path: 'xa', before: undefined, after: 'xa' },
      { type: 'add', path: 'cc.xa', before: undefined, after: 'xa' }
    ];
    const optins: JODOptions = {
      outputDiffTypeMappings: {
        replace: 'rep',
        delete: 'del',
        add: 'add'
      }
    };
    expect(jsonDeepDiffList(oldObj, newObj, optins)).toEqual(expectResult);
  });

  it('should be correct when custom output fromat -- outputDiffKeyPathType -- array', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const expectResult = [
      { type: 'replace', path: ['bar'], before: 'bar', after: 'BAR' },
      { type: 'replace', path: ['cc', 'bar'], before: 'bar', after: 'BAR' },
      { type: 'delete', path: ['car'], before: 'car', after: undefined },
      { type: 'delete', path: ['cc', 'car'], before: 'car', after: undefined },
      { type: 'add', path: ['xa'], before: undefined, after: 'xa' },
      { type: 'add', path: ['cc', 'xa'], before: undefined, after: 'xa' }
    ];
    const optins: JODOptions = {
      outputDiffKeyPathType: 'array'
    };
    expect(jsonDeepDiffList(oldObj, newObj, optins)).toEqual(expectResult);
  });

  it('should be correct when custom output fromat -- outputDiffKeyPathType -- string', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const expectResult = [
      { type: 'replace', path: 'bar', before: 'bar', after: 'BAR' },
      { type: 'replace', path: 'cc.bar', before: 'bar', after: 'BAR' },
      { type: 'delete', path: 'car', before: 'car', after: undefined },
      { type: 'delete', path: 'cc.car', before: 'car', after: undefined },
      { type: 'add', path: 'xa', before: undefined, after: 'xa' },
      { type: 'add', path: 'cc.xa', before: undefined, after: 'xa' }
    ];
    const optins: JODOptions = {
      outputDiffKeyPathType: 'string'
    };
    expect(jsonDeepDiffList(oldObj, newObj, optins)).toEqual(expectResult);
  });

  it('should be correct when custom output fromat -- outputNameMappings', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const expectResult = [
      { t: 'r', p: ['bar'], b: 'bar', a: 'BAR' },
      { t: 'r', p: ['cc', 'bar'], b: 'bar', a: 'BAR' },
      { t: 'd', p: ['car'], b: 'car', a: undefined },
      { t: 'd', p: ['cc', 'car'], b: 'car', a: undefined },
      { t: 'a', p: ['xa'], b: undefined, a: 'xa' },
      { t: 'a', p: ['cc', 'xa'], b: undefined, a: 'xa' }
    ];
    const optins: JODOptions = {
      outputNameMappings: {
        type: 't',
        path: 'p',
        before: 'b',
        after: 'a'
      },
      outputDiffTypeMappings: {
        replace: 'r',
        delete: 'd',
        add: 'a'
      },
      outputDiffKeyPathType: 'array'
    };
    expect(jsonDeepDiffList(oldObj, newObj, optins)).toEqual(expectResult);
  });
});

describe('test/json-deep-diff-list.test.ts -- groupKeyPath', () => {
  it('should be correct with json data', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const expectResult = {
      intersectionKeyPathGroup: ['foo', 'bar', 'cc.foo', 'cc.bar'],
      deleteKeyPathGroup: ['car', 'cc.car'],
      addKeyPathGroup: ['xa', 'cc.xa']
    };
    expect(groupKeyPath(oldObj, newObj)).toEqual(expectResult);
  });

  it('should be correct with json data and custom output format -- string', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const expectResult = {
      intersectionKeyPathGroup: ['foo', 'bar', 'cc.foo', 'cc.bar'],
      deleteKeyPathGroup: ['car', 'cc.car'],
      addKeyPathGroup: ['xa', 'cc.xa']
    };
    expect(groupKeyPath(oldObj, newObj, 'string')).toEqual(expectResult);
  });

  it('should be correct with json data and custom output format -- array', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const expectResult = {
      intersectionKeyPathGroup: [['foo'], ['bar'], ['cc', 'foo'], ['cc', 'bar']],
      deleteKeyPathGroup: [['car'], ['cc', 'car']],
      addKeyPathGroup: [['xa'], ['cc', 'xa']]
    };
    expect(groupKeyPath(oldObj, newObj, 'array')).toEqual(expectResult);
  });
});

describe('test/json-deep-diff-list.test.ts -- diffByKeyPathGroup', () => {
  it('should be correct with json data -- intersection group', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const options: JODOptions = {};
    const intersectionKeyPathGroup = ['foo', 'bar', 'cc.foo', 'cc.bar'];
    const expectResult = [
      { type: 'replace', path: 'bar', before: 'bar', after: 'BAR' },
      { type: 'replace', path: 'cc.bar', before: 'bar', after: 'BAR' }
    ];
    expect(diffByKeyPathGroup(oldObj, newObj, intersectionKeyPathGroup, 'intersection', options)).toEqual(expectResult);
  });

  it('should be correct with json data -- delete group', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const options: JODOptions = {};
    const deleteKeyPathGroup = ['car', 'cc.car'];
    const expectResult = [
      { type: 'delete', path: 'car', before: 'car', after: undefined },
      { type: 'delete', path: 'cc.car', before: 'car', after: undefined }
    ];
    expect(diffByKeyPathGroup(oldObj, newObj, deleteKeyPathGroup, 'delete', options)).toEqual(expectResult);
  });

  it('should be correct with json data -- add group', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const options: JODOptions = {};
    const addKeyPathGroup = ['xa', 'cc.xa'];
    const expectResult = [
      { type: 'add', path: 'xa', before: undefined, after: 'xa' },
      { type: 'add', path: 'cc.xa', before: undefined, after: 'xa' }
    ];
    expect(diffByKeyPathGroup(oldObj, newObj, addKeyPathGroup, 'add', options)).toEqual(expectResult);
  });

  it('should be correct with json data -- intersection group and array key path', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const options: JODOptions = {
      outputDiffKeyPathType: 'array'
    };
    const intersectionKeyPathGroup = [['foo'], ['bar'], ['cc', 'foo'], ['cc', 'bar']];
    const expectResult = [
      { type: 'replace', path: ['bar'], before: 'bar', after: 'BAR' },
      { type: 'replace', path: ['cc', 'bar'], before: 'bar', after: 'BAR' }
    ];
    expect(diffByKeyPathGroup(oldObj, newObj, intersectionKeyPathGroup, 'intersection', options)).toEqual(expectResult);
  });

  it('should be correct with json data -- delete group and array key path', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const options: JODOptions = {};
    const deleteKeyPathGroup = [['car'], ['cc', 'car']];
    const expectResult = [
      { type: 'delete', path: ['car'], before: 'car', after: undefined },
      { type: 'delete', path: ['cc', 'car'], before: 'car', after: undefined }
    ];
    expect(diffByKeyPathGroup(oldObj, newObj, deleteKeyPathGroup, 'delete', options)).toEqual(expectResult);
  });

  it('should be correct with json data -- add group and array key path', () => {
    const oldObj = {
      foo: 'foo',
      bar: 'bar',
      car: 'car',
      cc: {
        foo: 'foo',
        bar: 'bar',
        car: 'car'
      }
    };
    const newObj = {
      foo: 'foo',
      bar: 'BAR',
      xa: 'xa',
      cc: {
        foo: 'foo',
        bar: 'BAR',
        xa: 'xa'
      }
    };
    const options: JODOptions = {
      outputDiffKeyPathType: 'array'
    };
    const addKeyPathGroup = [['xa'], ['cc', 'xa']];
    const expectResult = [
      { type: 'add', path: ['xa'], before: undefined, after: 'xa' },
      { type: 'add', path: ['cc', 'xa'], before: undefined, after: 'xa' }
    ];
    expect(diffByKeyPathGroup(oldObj, newObj, addKeyPathGroup, 'add', options)).toEqual(expectResult);
  });
});
