/**
 * Split an array into fixed-size chunks.
 *
 * @template T
 * @param {T[]} input
 * @param {number} size
 * @returns {T[][]}
 */
export function chunkArray(input, size) {
  const chunks = [];

  for (let index = 0; index < input.length; index += size) {
    chunks.push(input.slice(index, index + size));
  }

  return chunks;
}
