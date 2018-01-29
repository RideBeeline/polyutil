# google-maps-polyutil

[![Build Status](https://travis-ci.org/RideBeeline/polyutil.svg?branch=master)](https://travis-ci.org/RideBeeline/polyutil)


Google Maps PolyUtil utils, and its tests, ported [from Java](https://github.com/googlemaps/android-maps-utils/blob/master/library/src/com/google/maps/android/PolyUtil.java).

## Installation

```shell
npm install --save google-maps-polyutil
```

## Usage

```javacsript
var polyutil = require('google-maps-polyutil')
var locations = [{latitude: 51, longitude: 0}, {latitude: 51, longitude: 0}, {latitude: 52, longitude: 0}, {latitude: 52, longitude: 0}]

// Simplification
var simplifiedLocations = polyutil.simplify(locations)

// Encode to string
var polyline = polyline.encode(simplifiedLocations)

// Decode from string
var decodedLocations = polyutil.decode(polyline)
```
