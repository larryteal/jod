/**
 * Checks if `value` is classified as a `json object` or an `array`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a `json object` or an `array`, else `false`.
 */
export function isObject (value: any): boolean {
  const type = Object.prototype.toString.call(value);
  if (type === '[object Object]' || type === '[object Array]') {
    return true;
  }
  return false;
}
