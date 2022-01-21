export function intersectionAndDifference (...arrays: Array<Array<string>>): Array<Array<string>> {
  const keySet: any = {};
  const result: Array<Array<string>> = [];
  let intersectionValue = 0;
  for (let i = 0; i <= arrays.length; i++) {
    result[i] = [];
    intersectionValue += i + arrays.length;
  }
  intersectionValue -= 3 * arrays.length;

  for (let i = 0; i < arrays.length; i++) {
    arrays[i].forEach(key => {
      keySet[key] = keySet[key] === undefined ? i : keySet[key] + i + arrays.length;
    });
  }

  Object.keys(keySet).forEach(key => {
    if (keySet[key] < result.length - 1) {
      result[keySet[key]].push(key);
    } else if (keySet[key] === intersectionValue) {
      result[result.length - 1].push(key);
    }
  });
  return result;
}
