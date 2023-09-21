// require
var edmundsSettings = require('../settings/edmunds');
var request = require('sync-request');
var mongodb = require('../services/mongodb');
var fs = require('fs');

console.log('Job started');

mongodb.searchCollection(null, 'models_styles').then(function (carYears) {
    carYears.forEach(function (carYear) {
        if (carYear.cars.length == 0) {
            console.log('no cars for ' + carYear.year);
        }

        carYear.cars.forEach(function (make) {
            if (make.models.length == 0) {
                console.log('no models for ' + carYear.year + ' ' + make.niceName);
            }

            make.models.forEach(function (model) {
                if (model.styles.length == 0) {
                    console.log('no styles for ' + carYear.year + ' ' + make.niceName + ' ' + model.niceName);
                }
                else {
                    //console.log(model.styles[0].id);
                    //model.styles.forEach(function (style) {
                    processStyle(carYear.year, model.styles[0]);
                    //});
                }
            });
        });
    });

    console.log('Job finished!');
    //process.exit();
});

function processStyle(year, style) {
    var fileName = 'json/prices/' + style.id + '.json';

    if (fs.existsSync(fileName)) {
        console.log(fileName + ' was already created, skipped!');
        return;
    }

    var depreciation = processDepreciation(year, style.id);

    fs.writeFileSync(fileName, JSON.stringify(depreciation));

    console.log(fileName + ' was written!');
}

function processDepreciation(year, styleid) {
    var zip = 10305;
    var mileages = getMileages(0, 5000, 100000);
    var depreciation = [];

    var pricesUrl = edmundsSettings.settings().pricesUrl + edmundsSettings.settings().key;
    pricesUrl = pricesUrl.replace('{styleid}', styleid).replace('{zip}', zip).replace('{year}', year);

    mileages.forEach(function (miles) {
        var url = pricesUrl.replace('{mileage}', miles);
        var priceRes = request('GET', url);
        var nationalBasePrice = JSON.parse(priceRes.getBody('utf8')).tmv.nationalBasePrice;
        var mileageAdjustment = JSON.parse(priceRes.getBody('utf8')).tmv.mileageAdjustment;

        depreciation.push({
            mileage: miles,
            nationalBasePrice: nationalBasePrice,
            mileageAdjustment: mileageAdjustment
        });
    });

    return depreciation;
}

function getMileages(start, step, stop) {
    var mileages = [];

    for (var total = start; total <= stop;) {
        mileages.push(total);
        total = total + step;
    }

    return mileages;
}