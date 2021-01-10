"use strict";

const Coordinate = require("./coordinate.js");
class Customer {

    #name;
    #userId;
    #coordinate;

    constructor(json) {
        this.#name = json.name;
        this.#userId = json.user_id;
        this.#coordinate = new Coordinate(json.latitude, json.longitude);
    }

    get name() { return this.#name }
    get userId() { return this.#userId }
    get coordinate() { return this.#coordinate }

}

module.exports = Customer;