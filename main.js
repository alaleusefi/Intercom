"use strict";
var Config = require("./config.js");

const os = require("os");
const fs = require('fs');
const CustomerService = require("./customerService.js");
const Coordinate = require("./coordinate.js");
const { config } = require("process");

let customerSrv = new CustomerService(Config.customersUrl);

customerSrv.GetList((...args) => generateOutput(...args), (...args) => showError(...args));

const showError = function(error){
    console.log(error.message);
}


const generateOutput = function (customers) {
    const targetCoordinate = new Coordinate(Config.officeCoordinates.latitude, Config.officeCoordinates.longitude);
    const toBeInvited = customers.filter(customer => customer.coordinate.getDistance(targetCoordinate) <= Config.invitationRadius);
    toBeInvited.sort((a, b) => a.userId - b.userId);
    const outputText = toBeInvited.map(c => `${c.userId} - ${c.name} ${os.EOL}`).join("");
    fs.writeFile(Config.outputFilePath, outputText, err => {
        if (err)
            console.log(err.message);
        else
            console.log("Success. The output is saved in "+ Config.outputFilePath); 
    });
}
