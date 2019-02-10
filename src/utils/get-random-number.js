/**
 * Return a random number.
 * @param {Number} [min]
 *   The minimum number (default 1).
 * @param {Number} [max]
 *   The maximum number (default min + 1).
 * @param {boolean} round
 *   True to round the number to the nearest integer, false otherwise.
 * @return {Number}
 *   A random number between min and max.
 */
export default (min = 1, max = min + 1, round = false) => {
  const minN = parseFloat(min);
  const maxN = parseFloat(max);
  const n = Math.random() * (maxN - minN) + minN;
  return round ? Math.round(n) : n;
};
