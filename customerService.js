"use strict";

const Customer = require("./customer.js");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = class CustomerService {
    #url;
    constructor(url) {
       this.#url = url;
    }

    GetList(resolver, rejecter) {
        const xhttp = new XMLHttpRequest();
        let method = "GET";
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const customers = [];
                    for (let line of xhttp.responseText.split("\n")) {
                        const obj = JSON.parse(line);
                        const customer = new Customer(obj);
                        customers.push(customer);
                    }
                    resolver(customers);
                } else {
                    rejecter(new Error("Api call failed to retrieve customer list."));
                }
            }
        }
        xhttp.open(method, this.#url, true);
        xhttp.send();
    }
}