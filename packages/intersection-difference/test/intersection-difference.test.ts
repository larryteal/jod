import { intersectionAndDifference } from '../src/intersection-difference';

describe('test/intersection-difference.test.ts', () => {
  it('should be correct with 2 string array sets', () => {
    const setA: string[] = ['aa', 'bb', 'cc', 'dd'];
    const setB: string[] = ['cc', 'dd', 'ee', 'ff'];
    const expectResult: string[][] = [['aa', 'bb'], ['ee', 'ff'], ['cc', 'dd']];
    expect(intersectionAndDifference(setA, setB)).toEqual(expectResult);
  });

  it('should be correct with 1 string array set', () => {
    const setA: string[] = ['aa', 'bb', 'cc', 'dd'];
    const expectResult: string[][] = [['aa', 'bb', 'cc', 'dd'], []];
    expect(intersectionAndDifference(setA)).toEqual(expectResult);
  });

  it('should be correct with 2 empty string array set', () => {
    const setA: string[] = [];
    const setB: string[] = [];
    const expectResult: string[][] = [[], [], []];
    expect(intersectionAndDifference(setA, setB)).toEqual(expectResult);
  });

  it('should be correct with 1 empty string array set', () => {
    const setA: string[] = [];
    const setB: string[] = ['aa', 'bb', 'cc', 'dd'];
    const expectResult: string[][] = [[], ['aa', 'bb', 'cc', 'dd'], []];
    expect(intersectionAndDifference(setA, setB)).toEqual(expectResult);
  });

  it('should be correct with 1 empty string array set', () => {
    const setA: string[] = ['aa', 'bb', 'cc', 'dd'];
    const setB: string[] = [];
    const expectResult: string[][] = [['aa', 'bb', 'cc', 'dd'], [], []];
    expect(intersectionAndDifference(setA, setB)).toEqual(expectResult);
  });

  it('should be correct with multiple string array sets', () => {
    const setA: string[] = ['aa', 'bb', 'cc', 'dd'];
    const setB: string[] = ['cc', 'dd', 'ee', 'ff'];
    const setC: string[] = ['cc', 'dd', 'gg', 'hh'];
    const expectResult: string[][] = [['aa', 'bb'], ['ee', 'ff'], ['gg', 'hh'], ['cc', 'dd']];
    expect(intersectionAndDifference(setA, setB, setC)).toEqual(expectResult);
  });
});
