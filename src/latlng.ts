/**
 * Model of https://developers.google.com/android/reference/com/google/android/gms/maps/model/LatLng
 */

export interface LatLng {
  latitude: number
  longitude: number
}

export function isEqual(a: LatLng, b: LatLng): boolean {
  return a.latitude === b.latitude && a.longitude == b.longitude
}
