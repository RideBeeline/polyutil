import 'mocha'
import * as assert from 'assert'

import { LatLng } from '../src/LatLng'
import { EARTH_RADIUS, toRadians } from '../src/MathUtil'
import * as SphericalUtil from '../src/SphericalUtil'

function expectNearNumber(actual: number, expected: number, epsilon: number) {
  assert.equal(
    true,
    Math.abs(expected - actual) <= epsilon,
    `Expected ${actual} to be near ${expected}`
  )
}

const up: LatLng = {latitude: 90, longitude: 0}
const down: LatLng ={latitude: -90, longitude: 0}

describe('sphericalutil', () => {

  describe('computeDistanceBetween', () => {

    it('computes distance between', () => {
      expectNearNumber(SphericalUtil.computeDistanceBetween(up, down), Math.PI * EARTH_RADIUS, 1e-6)
    })

  })

  describe('computeLength', () => {

    it('computes length', () => {
      let latLngs: LatLng[]

      expectNearNumber(SphericalUtil.computeLength([]), 0, 1e-6)
      expectNearNumber(SphericalUtil.computeLength([{latitude: 0, longitude: 0}]), 0, 1e-6)

      latLngs = [{latitude: 0, longitude: 0}, {latitude: 0.1, longitude: 0.1}]
      expectNearNumber(SphericalUtil.computeLength(latLngs),
              toRadians(0.1) * Math.sqrt(2) * EARTH_RADIUS, 1)

      latLngs = [{latitude: 0, longitude: 0}, {latitude: 90, longitude: 0}, {latitude: 0, longitude: 90}]
      expectNearNumber(SphericalUtil.computeLength(latLngs), Math.PI * EARTH_RADIUS, 1e-6)
    })

  })

})
