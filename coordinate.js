"use strict";

class Coordinate {
    #earthRadius = 6371;
    #latitude;
    #longitude;

    constructor(latitude, longitude) {
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    get latitude() { return this.#latitude }
    get longitude() { return this.#longitude }
    get radains() {
        return {
            latitude: this.#toRadians(this.#latitude),
            longitude: this.#toRadians(this.#longitude)
        }
    }

    getDistance(target) {
        const longDiff = Math.abs(this.radains.longitude - target.radains.longitude);
        const sineProduct = Math.sin(this.radains.latitude) * Math.sin(target.radains.latitude);
        const cosineProduct = Math.cos(this.radains.latitude) * Math.cos(target.radains.latitude) * Math.cos(longDiff);
        return (this.#earthRadius * Math.acos(sineProduct + cosineProduct)).toFixed(2);
    }

    #toRadians(degrees) { return degrees * Math.PI / 180 }
}

module.exports = Coordinate;