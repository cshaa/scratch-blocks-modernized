
/**
 * Removes the first occurrence of a particular value from an array.
 * @param {Array} array Array from which to remove value.
 * @param {any} element Element to remove.
 * @returns {boolean} True if an element was removed.
 */
export function remove<T>(array: T[], element: T): boolean {
  const i = array.indexOf(element);

  if (i === -1) return false;
    
  array.splice(i, 1);
  return true;
}

