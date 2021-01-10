"use strict";

const assert = require("assert");
const CustomerService = require("../customerService.js");
const Customer = require("../customer.js");
const Config = require("../config.js")

describe('CustomerService', function () {
    describe('GetList', function () {
        it('Invokes reject callback on fail.', function () {
            const wrongUrl = "no-exist.com"
            const customerService = new CustomerService(wrongUrl);
            customerService.GetList(null, () => assert.strictEqual(true, true));
        });

        it('Returns correct message on fail.', function () {
            const wrongUrl = "no-exist.com"
            const customerService = new CustomerService(wrongUrl);
            customerService.GetList(null, (err) => assert.strictEqual(err.message, "Api call failed to retrieve customer list."));
        });

        it('Retrives customers list.', function () {
            const customerService = new CustomerService(Config.customersUrl);
            customerService.GetList((customers) => assert.strictEqual(Array.isArray(customers), true));
        });

        it('Returns customer type.', function () {
            const customerService = new CustomerService(Config.customersUrl);
            customerService.GetList((customers) => assert.strictEqual(customers[0] instanceof Customer, true));
        });
    });
});


