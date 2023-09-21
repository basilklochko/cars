var mongodb = require('../services/mongodb');
var mockAutoTrader = require('../mocks/autotraderData');
var autotrader = require('../services/autoTraderExtractor');
var chalk = require('chalk');

// TODO: Kill this shit please
require('../services/carChart.js');

require('../services/edmundsExtractor.js');

exports.getCarDepreciationByYearMakeModel = function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var req_year = req.params['Year'] * 1;
    var req_make = req.params['Make'];
    var req_model = req.params['Model'];

    var searchCriterias = [{
        field: 'year',
        value: req_year
    }];

    mongodb.searchCollection(searchCriterias, 'models_prices').then(function (data) {
        var result = [];

        data.forEach(function (item) {
            item.cars.forEach(function (car) {
                if (car.name == req_make) {
                    car.models.forEach(function (model) {
                        if (model.name == req_model) {
                            var depreciation = model.styles[0].depreciation;

                            depreciation.forEach(function (tmv) {
                                result.push({
                                    mileage: tmv.mileage,
                                    price: tmv.nationalBasePrice.usedTmvRetail + tmv.mileageAdjustment.usedTmvRetail
                                });
                            });
                        }
                    });
                }
            });
        });

        res.send(JSON.stringify(result));
    });
};

exports.getMakeModelsByYear = function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var searchCriterias = [{
        field: 'year',
        value: req.params['Year'] * 1
    }];

    mongodb.searchCollection(searchCriterias, 'models').then(function (data) {
        var cars = [];

        data.forEach(function (item, index) {
            var car = {
                year: item.year,
                cars: item.cars
            };

            cars.push(car);
        });

        res.send(JSON.stringify(cars));
    });
};

exports.getMakeModelFromSource = function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    var pgCntRequired = false;

    if (req.params['Page'] == 1)
        pgCntRequired = true;

    // TODO: remove it. diagnose the bug of some calls when pages are not returned
    console.log(chalk.green("*******   possible bad call diagnostics *****"));
    console.log(chalk.green("Make: " + req.params['Make']));
    console.log(chalk.green("Model: " + req.params['Model']));
    console.log(chalk.green("Page: " + req.params['Page']));



    var queryParameters = {
        Model: req.params['Model'],
        Make: req.params['Make'],
        Page: req.params['Page'],
        PageCountRequired: pgCntRequired,
        State: "NY"
    };

    // TODO: this stub is for testing purposes only
    overrideEdmunds(queryParameters);

    res.setHeader('Content-Type', 'application/json');
    var sendBack = function (cd) {
        // TODO: Stringify doesn't work right on mixed objects
        res.send(JSON.stringify(cd));
    };

    autotrader.ExtractDataFromAutotraderOnePage(queryParameters, sendBack);

};

exports.getMakeModelFromCache = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    // TODO: Do it from Mocks till develop Mongo cache
    var data = mockAutoTrader.BMW5data();
    res.send(JSON.stringify(data));
};

exports.TestSelectors = function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var sendBack = function (cd) {
        // TODO: Stringify doesn't work right on mixed objects
        res.send(JSON.stringify(cd));
    };

    mockAutoTrader.SelectorsTest(sendBack);
}


function overrideEdmunds(q) {
    if (q.Make == "BMW") {
        if (q.Model == "5 Series")
            q.Model = "528I";
        else if (q.Model == "3 Series")
            q.Model = "328I"
        else if (q.Model == "1 Series")
            q.Model = "128I"
    }
}
