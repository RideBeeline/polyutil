/**
 * Ported from https://github.com/googlemaps/android-maps-utils/blob/70cbb346e74eee8531a06d90521886eeef82efab/library/src/com/google/maps/android/MathUtil.java
 * unless otherwise specified
 */

export const EARTH_RADIUS = 6371009

/**
 * java.lang.Math.toRadians
 */
export function toRadians(degrees: number) {
  return degrees * Math.PI / 180.0
}

/**
 * Computes inverse haversine. Has good numerical stability around 0.
 * arcHav(x) == acos(1 - 2 * x) == 2 * asin(sqrt(x)).
 * The argument must be in [0, 1], and the result is positive.
 */
export function arcHav(x: number): number {
  return 2.0 * Math.asin(Math.sqrt(x))
}
