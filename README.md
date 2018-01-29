# google-maps-polyutils

[![Build Status](https://travis-ci.org/RideBeeline/polyutil.svg?branch=master)](https://travis-ci.org/RideBeeline/polyutil)


Google Maps PolyUtils utils, and its tests, ported [from Java](https://github.com/googlemaps/android-maps-utils/blob/master/library/src/com/google/maps/android/PolyUtil.java).

## Installation

```shell
npm install --save google-maps-polyutils
```

## Usage

```javacsript
var polyutils = require('google-maps-polyutils')
var locations = [{latitude: 51, longitude: 0}, {latitude: 51, longitude: 0}, {latitude: 52, longitude: 0}, {latitude: 52, longitude: 0}]

// Simplification
val simplifiedLocations = polyutils.simplify(locations)

// Encode to string
var polyline = polyline.encode(simplifiedLocations)

// Decode from string
val decodedLocations = polyutils.decode(polyline)
```
