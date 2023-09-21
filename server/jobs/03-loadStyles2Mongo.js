// require
var mongodb = require('../services/mongodb');
var fs = require('fs');

console.log('Job started');

mongodb.clearCollection('models_styles');

var carYearsWithStyles = [];

mongodb.searchCollection(null, 'models').then(function (carYears) {
    carYears.forEach(function (carYear) {
        var carYearWithStyles = { year: carYear.year, cars: [] };

        carYear.cars.forEach(function (make) {
            var modelsWithStyles = [];

            make.models.forEach(function (model) {
                var modelWithStyles = processModel(carYear.year, make.niceName, model.niceName, model);
                modelsWithStyles.push(modelWithStyles);
            });

            make.models = modelsWithStyles;
            carYearWithStyles.cars.push(make);
        });

        carYearsWithStyles.push(carYearWithStyles);
        mongodb.insertDocuments(carYearsWithStyles, 'models_styles', function () {
            console.log(carYearWithStyles.year + ' was processed!');

            if (carYearWithStyles.year == (new Date).getFullYear()) {
                console.log('Job finished!');
                process.exit();
            }
        });
    });
});

function processModel(year, makeNiceName, modelNiceName, model) {
    var fileName = 'json/styles/' + year + '_' + makeNiceName + '_' + modelNiceName + '.json';

    if (!fs.existsSync(fileName)) {
        console.log(fileName + ' was not created, skipped!');
        return;
    }

    var content = fs.readFileSync(fileName, 'utf-8');
    model.styles = JSON.parse(content).styles;

    return model;
}