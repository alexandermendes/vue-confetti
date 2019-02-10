/**
 * Return a random number.
 * @param {Number} [min]
 *   The minimum number (default 1).
 * @param {Number} [max]
 *   The maximum number.
 * @param {boolean} round
 *   True to round the number to the nearest integer, false otherwise.
 * @return {Number}
 *   A random number between min and max.
 */
export default (min = 1, max = min + (min = 0), round = false) => { // eslint-disable-line no-param-reassign
  const n = Math.random() * (max - min) + min;
  return round ? Math.round(n) : n;
};
