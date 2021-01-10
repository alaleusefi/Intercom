"use strict";

const assert = require("assert");
const Coordinate = require("../coordinate.js");
const Config = require("../config.js")

describe('Coordinate', function () {
    describe('getDistance', function () {
        //Test a coordinate returns 0 if calculate the distance to itself
        it('Returns 0 from itself', function () {
            const baseCoordinate = new Coordinate(
                Config.officeCoordinates.latitude,
                Config.officeCoordinates.longitude,
            );
            assert.strictEqual(baseCoordinate.getDistance(baseCoordinate), (0).toFixed(2));
        });

          //Test a customer coordinate returns correct distance from office coordinate
          it('Calculates correct distance', function () {
            const officeCoordinate = new Coordinate(
                Config.officeCoordinates.latitude,
                Config.officeCoordinates.longitude,
            );
            const baseCoordinate = new Coordinate(
                "52.986375",
                "-6.043701",
            );
            assert.strictEqual(baseCoordinate.getDistance(officeCoordinate), (41.77).toFixed(2));
        });

    });
});


