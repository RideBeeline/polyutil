/**
 * Ported from https://github.com/googlemaps/android-maps-utils/blob/70cbb346e74eee8531a06d90521886eeef82efab/library/src/com/google/maps/android/SphericalUtil.java
 */

import { arcHav, toRadians } from './math'
import { LatLng } from './latlng'

const EARTH_RADIUS = 6371009

/**
 * Returns haversine(angle-in-radians).
 * hav(x) == (1 - cos(x)) / 2 == sin(x / 2)^2.
 */
function hav(x: number): number {
  const sinHalf = Math.sin(x * 0.5)
  return sinHalf * sinHalf
}

/**
 * Returns hav() of distance from (lat1, lng1) to (lat2, lng2) on the unit sphere.
 */
function havDistance(lat1: number, lat2: number, dLng: number): number {
  return hav(lat1 - lat2) + hav(dLng) * Math.cos(lat1) * Math.cos(lat2)
}

/**
 * Returns distance on the unit sphere; the arguments are in radians.
 */
function distanceRadians(lat1: number, lng1: number, lat2: number, lng2: number): number {
  return arcHav(havDistance(lat1, lat2, lng1 - lng2))
}

/**
 * Returns the angle between two LatLngs, in radians. This is the same as the distance
 * on the unit sphere.
 */
function computeAngleBetween(from: LatLng, to: LatLng): number {
  return distanceRadians(toRadians(from.latitude), toRadians(from.longitude),
                          toRadians(to.latitude), toRadians(to.longitude))
}

/**
 * Returns the distance between two LatLngs, in meters.
 */
export function computeDistanceBetween(from: LatLng, to: LatLng): number {
  return computeAngleBetween(from, to) * EARTH_RADIUS
}
