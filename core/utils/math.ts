

const DEGREES_TO_RADIANS = Math.PI / 180.0;

/**
 * Converts degrees to radians.
 * @param {number} deg Angle in degrees.
 * @returns {number} Angle in radians.
 */
export function degToRad(deg: number): number {
  return deg * DEGREES_TO_RADIANS;
}

/**
 * Converts radians to degrees.
 * @param {number} rad Angle in radians.
 * @returns {number} Angle in degrees.
 */
export function radToDeg(rad: number): number {
  return rad / DEGREES_TO_RADIANS;
}

/**
 * Class for representing coordinates and positions.
 */
export class Point2 {
  constructor(public x: number, public y: number) {}
}

