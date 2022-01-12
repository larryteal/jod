import { jsonKeyPathList } from '../src';

describe('test/jsonKeyPathList.test.ts', () => {
  it('should be correct with normal json data', () => {
    const inputData = {
      a: 1,
      b: 'b',
      c: true,
      foo: 'foo',
      arr: [1, 2, 3],
      obj: {
        o: 'o',
        b: 1,
        j: 'jjj'
      }
    };
    const expectResult: any[] = [
      'a',
      'b',
      'c',
      'foo',
      'arr.0',
      'arr.1',
      'arr.2',
      'obj.o',
      'obj.b',
      'obj.j'
    ];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be correct with normal empty json data', () => {
    const inputData = {};
    const expectResult: any = [];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be correct with json sub item empty data', () => {
    const inputData = {
      foo: {},
      bar: {
        b: {}
      }
    };
    const expectResult: any = [
      'foo',
      'bar.b'
    ];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be correct with json mixed sub item empty data', () => {
    const inputData = {
      ni: 'ni',
      foo: {},
      bar: {
        b: {},
        ar: 'ar'
      },
      num: 1
    };
    const expectResult: any = [
      'ni',
      'foo',
      'bar.b',
      'bar.ar',
      'num'
    ];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be correct with json mixed Object data', () => {
    const inputData = {
      ni: 'ni',
      num: 123,
      foo: {},
      bar: {
        b: {}
      },
      fn: () => {},
      date: new Date(),
      rex: /abc/
    };
    const expectResult: any = [
      'ni',
      'num',
      'foo',
      'bar.b',
      'fn',
      'date',
      'rex'
    ];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be correct with class instance data', () => {
    class Person {
      public name: any;
      private age: any;
      constructor (name: any, age: any) {
        this.name = name;
        this.age = age;
      }

      public getAge () {
        return this.age;
      }
    }
    const inputData = new Person('jod', 1);
    const expectResult: any = [
      'name',
      'age'
    ];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be correct with array data', () => {
    const inputData = [
      1,
      'aa',
      true,
      { foo: { f: 'f', o: 'oo' } }
    ];
    const expectResult: any = ['0', '1', '2', '3.foo.f', '3.foo.o'];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be no error with basic type data -- number', () => {
    const inputData = 1;
    const expectResult: any = [];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be no error with basic type data -- string', () => {
    const inputData = 'str';
    const expectResult: any = [];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be no error with basic type data -- boolean', () => {
    const inputData = true;
    const expectResult: any = [];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be no error with basic type data -- undefined', () => {
    const inputData = undefined;
    const expectResult: any = [];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be no error with basic type data -- null', () => {
    const inputData = null;
    const expectResult: any = [];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be no error with Object but not JSON object data -- function', () => {
    const inputData = () => {};
    const expectResult: any = [];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be no error with Object but not JSON object data -- Date', () => {
    const inputData = new Date();
    const expectResult: any = [];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });

  it('should be no error with empty array data', () => {
    const inputData: any = [];
    const expectResult: any = [];
    expect(jsonKeyPathList(inputData)).toEqual(expectResult);
  });
});
