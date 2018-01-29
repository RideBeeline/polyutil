import 'mocha'
import * as assert from 'assert'

import { LatLng } from '../src/LatLng'
import * as SphericalUtil from '../src/SphericalUtil'
import * as PolyUtil from '../src/PolyUtil'

function expectNearNumber(actual: number, expected: number, epsilon: number) {
  assert(
    Math.abs(expected - actual) <= epsilon,
    `Expected ${actual} to be near ${expected}`
  )
}

/**
 * Asserts that the beginning point of the original line matches the beginning point of the
 * simplified line, and that the end point of the original line matches the end point of the
 * simplified line.
 * @param line original line
 * @param simplifiedLine simplified line
 */
function assertEndPoints(line: LatLng[], simplifiedLine: LatLng[]) {
  assert.equal(line[0], simplifiedLine[0])
  assert.equal(line[line.length - 1], simplifiedLine[simplifiedLine.length - 1])
}

/**
 * Asserts that the simplified line is composed of points from the original line.
 * @param line original line
 * @param simplifiedLine simplified line
 */
function assertSimplifiedPointsFromLine(line: LatLng[], simplifiedLine: LatLng[]) {
  simplifiedLine.forEach(l => {
    assert.equal(true, line.indexOf(l) >= 0)
  })
}

/**
 * Asserts that the length of the simplified line is always equal to or less than the length of
 * the original line, if simplification has eliminated any points from the original line
 * @param line original line
 * @param simplifiedLine simplified line
 */
function assertLineLength(line: LatLng[], simplifiedLine: LatLng[]) {
  if (line.length == simplifiedLine.length) {
    // If no points were eliminated, then the length of both lines should be the same
    assert.equal(true, SphericalUtil.computeLength(simplifiedLine) == SphericalUtil.computeLength(line))
  } else {
    assert.equal(true, simplifiedLine.length < line.length)
    // If points were eliminated, then the simplified line should always be shorter
    assert.equal(true, SphericalUtil.computeLength(simplifiedLine) < SphericalUtil.computeLength(line))
  }
}

/**
 * Returns a copy of the LatLng objects contained in one list to another list.  LatLng.latitude
 * and LatLng.longitude are immutable, so having references to the same LatLng object is
 * sufficient to guarantee that the contents are the same.
 * @param original original list
 * @return a copy of the original list, containing references to the same LatLng elements in
 * the same order.
 */
function copyList(original: LatLng[]): LatLng[] {
  return original.map((l) => Object.assign({}, l))
}

/**
 * Asserts that the contents of the original List passed into the PolyUtil.simplify() method
 * doesn't change after the method is executed.  We test for this because the poly is modified
 * (a small offset is added to the last point) to allow for polygon simplification.
 * @param afterInput the list passed into PolyUtil.simplify(), after PolyUtil.simplify() has
 *                   finished executing
 * @param beforeInput a copy of the list before it is passed into PolyUtil.simplify()
 */
function assertInputUnchanged(afterInput: LatLng[], beforeInput: LatLng[]) {
  assert.equal(beforeInput.length, afterInput.length, 'input length')
  for (let i = 0; i < beforeInput.length; i++) {
    assert.equal(afterInput[i].latitude, beforeInput[i].latitude, `latitude at index ${i}`)
    assert.equal(afterInput[i].longitude, beforeInput[i].longitude, `longitude at index ${i}`)
  }
}

describe('polyutil', () => {

  describe('isClosedPolygon', () => {

    it('detects closed polygon', () => {
      const poly = [
        {latitude: 28.06025, longitude: -82.41030},
        {latitude: 28.06129, longitude: -82.40945},
        {latitude: 28.06206, longitude: -82.40917},
        {latitude: 28.06125, longitude: -82.40850},
        {latitude: 28.06035, longitude: -82.40834}
      ]

      assert.equal(false, PolyUtil.isClosedPolygon(poly))

      // Add the closing point that's same as the first
      poly.push({latitude: 28.06025, longitude: -82.41030})
      assert.equal(true, PolyUtil.isClosedPolygon(poly))
    })

  })

  describe('distanceToLine', () => {

    it('computes distance to line', () => {
      const startLine = {latitude: 28.05359, longitude: -82.41632}
      const endLine = {latitude: 28.05310, longitude: -82.41634}
      const p = {latitude: 28.05342, longitude: -82.41594}

      const distance = PolyUtil.distanceToLine(p, startLine, endLine)
      expectNearNumber(42.989894, distance, 1e-6)
    })

  })

  describe('simplify', () => {

    const line = require('./fixtures/line')
    // assert.equal(95, line.length)

    describe('polylines', () => {

      it('simplifies with tolerance 5', () => {
        const tolerance = 5 // meters
        const copy = copyList(line)
        const simplifiedLine = PolyUtil.simplify(line, tolerance)
        assert.equal(21, simplifiedLine.length)
        assertEndPoints(line, simplifiedLine)
        assertSimplifiedPointsFromLine(line, simplifiedLine)
        assertLineLength(line, simplifiedLine)
        assertInputUnchanged(line, copy)
      })

      it('simplifies with tolerance 10', () => {
        const tolerance = 10 // meters
        const copy = copyList(line)
        const simplifiedLine = PolyUtil.simplify(line, tolerance)
        assert.equal(14, simplifiedLine.length)
        assertEndPoints(line, simplifiedLine)
        assertSimplifiedPointsFromLine(line, simplifiedLine)
        assertLineLength(line, simplifiedLine)
        assertInputUnchanged(line, copy)
      })

      it('simplifies with tolerance 15', () => {
        const tolerance = 15 // meters
        const copy = copyList(line)
        const simplifiedLine = PolyUtil.simplify(line, tolerance)
        assert.equal(10, simplifiedLine.length)
        assertEndPoints(line, simplifiedLine)
        assertSimplifiedPointsFromLine(line, simplifiedLine)
        assertLineLength(line, simplifiedLine)
        assertInputUnchanged(line, copy)
      })

      it('simplifies with tolerance 20', () => {
        const tolerance = 20 // meters
        const copy = copyList(line)
        const simplifiedLine = PolyUtil.simplify(line, tolerance)
        assert.equal(8, simplifiedLine.length)
        assertEndPoints(line, simplifiedLine)
        assertSimplifiedPointsFromLine(line, simplifiedLine)
        assertLineLength(line, simplifiedLine)
        assertInputUnchanged(line, copy)
      })

      it('simplifies with tolerance 500', () => {
        const tolerance = 500 // meters
        const copy = copyList(line)
        const simplifiedLine = PolyUtil.simplify(line, tolerance)
        assert.equal(3, simplifiedLine.length)
        assertEndPoints(line, simplifiedLine)
        assertSimplifiedPointsFromLine(line, simplifiedLine)
        assertLineLength(line, simplifiedLine)
        assertInputUnchanged(line, copy)
      })

      it('simplifies with tolerance 1000', () => {
        const tolerance = 1000 // meters
        const copy = copyList(line)
        const simplifiedLine = PolyUtil.simplify(line, tolerance)
        assert.equal(2, simplifiedLine.length)
        assertEndPoints(line, simplifiedLine)
        assertSimplifiedPointsFromLine(line, simplifiedLine)
        assertLineLength(line, simplifiedLine)
        assertInputUnchanged(line, copy)
      })

    })

    describe('polygons', () => {

      it('simplifies triangles', () => {
        // Open triangle
        const triangle = [
          {latitude: 28.06025, longitude: -82.41030},
          {latitude: 28.06129, longitude: -82.40945},
          {latitude: 28.06206, longitude: -82.40917},
          {latitude: 28.06125, longitude: -82.40850},
          {latitude: 28.06035, longitude: -82.40834},
          {latitude: 28.06038, longitude: -82.40924}
        ]
        assert.equal(false, PolyUtil.isClosedPolygon(triangle))

        let copy = copyList(triangle)
        const tolerance = 88 // meters
        let simplifiedTriangle = PolyUtil.simplify(triangle, tolerance)
        assert.equal(4, simplifiedTriangle.length)
        assertEndPoints(triangle, simplifiedTriangle)
        assertSimplifiedPointsFromLine(triangle, simplifiedTriangle)
        assertLineLength(triangle, simplifiedTriangle)
        assertInputUnchanged(triangle, copy)

        // Close the triangle
        const p = triangle[0]
        const closePoint = {latitude: p.latitude, longitude: p.longitude}
        triangle.push(closePoint)
        assert.equal(true, PolyUtil.isClosedPolygon(triangle))

        copy = copyList(triangle)
        simplifiedTriangle = PolyUtil.simplify(triangle, tolerance)
        assert.equal(4, simplifiedTriangle.length)
        assertEndPoints(triangle, simplifiedTriangle)
        assertSimplifiedPointsFromLine(triangle, simplifiedTriangle)
        assertLineLength(triangle, simplifiedTriangle)
        assertInputUnchanged(triangle, copy)
      })

      it('simplifies ovals', () => {
        // Open oval
        const oval = require('./fixtures/oval_polygon')
        assert.equal(false, PolyUtil.isClosedPolygon(oval))

        let copy = copyList(oval)
        const tolerance = 10 // meters
        let simplifiedOval = PolyUtil.simplify(oval, tolerance)
        assert.equal(13, simplifiedOval.length)
        assertEndPoints(oval, simplifiedOval)
        assertSimplifiedPointsFromLine(oval, simplifiedOval)
        assertLineLength(oval, simplifiedOval)
        assertInputUnchanged(oval, copy)

        // Close the oval
        const p = oval[0]
        const closePoint = {latitude: p.latitude, longitude: p.longitude}
        oval.push(closePoint)
        assert.equal(true, PolyUtil.isClosedPolygon(oval))

        copy = copyList(oval)
        simplifiedOval = PolyUtil.simplify(oval, tolerance)
        assert.equal(13, simplifiedOval.length)
        assertEndPoints(oval, simplifiedOval)
        assertSimplifiedPointsFromLine(oval, simplifiedOval)
        assertLineLength(oval, simplifiedOval)
        assertInputUnchanged(oval, copy)
      })

    })

  })


})
