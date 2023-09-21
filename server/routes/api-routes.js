//var car_data_Autotrader = require('../mocks/autotraderData');
//var car_data_Edmunds = require('../mocks/edmundsData');
//var car_data_extractor = require('../services/autoTraderExtractor');
var carsApi = require('../services/carsApi');

exports.getCarDepreciation = function (req, res) {
    return carsApi.getCarDepreciationByYearMakeModel(req, res);
};

exports.getMakeModelsByYear = function (req, res) {
    return carsApi.getMakeModelsByYear(req, res);
};

exports.getMakeModelFromSource = function (req, res) {
    return carsApi.getMakeModelFromSource(req, res);
};

exports.getMakeModelFromCache = function (req, res) {
    return carsApi.getMakeModelFromCache(req, res);
};

exports.TestSelectors = function (req, res) {
    return carsApi.TestSelectors(req, res);
};
