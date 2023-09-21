// require
var edmundsSettings = require('../settings/edmunds');
var request = require('sync-request');
var mongodb = require('../services/mongodb');
var fs = require('fs');

console.log('Job started');

mongodb.searchCollection(null, 'models').then(function (carYears) {
    carYears.forEach(function (carYear) {
        carYear.cars.forEach(function (make) {
            make.models.forEach(function (model) {
                processModel(carYear.year, make.niceName, model.niceName, model);
            });
        });
    });

    console.log('Job finished!');
    process.exit();
});

function processModel(year, makeNiceName, modelNiceName, model) {
    var fileName = 'json/styles/' + year + '_' + makeNiceName + '_' + modelNiceName + '.json';

    if (fs.existsSync(fileName)) {
        console.log(fileName + ' was already created, skipped!');
        return;
    }

    var stylesUrl = edmundsSettings.settings().stylesUrl + edmundsSettings.settings().key;
    stylesUrl = stylesUrl.replace('{makeNiceName}', makeNiceName).replace('{modelNiceName}', modelNiceName).replace('{year}', year);
    var stylesRes = request('GET', stylesUrl);
    var rowStyles = JSON.parse(stylesRes.getBody('utf8')).styles;

    styles = [];

    rowStyles.forEach(function (rowStyle) {
        var style = {
            id: rowStyle.id,
            numOfDoors: rowStyle.numOfDoors,
            trim: rowStyle.trim,
            drivenWheels: rowStyle.drivenWheels,
            depreciation: {} // processPrices(rowStyle.id)
        };

        styles.push(style);
    });

    model.styles = styles;

    fs.writeFileSync(fileName, JSON.stringify(model));

    console.log(fileName + ' was written!');
}