var mongodb = require('../services/mongodb');
var fs = require('fs');

console.log('Job started');

mongodb.clearCollection('models_prices');

mongodb.searchCollection(null, 'models_styles').then(function (carYears) {
    carYears.forEach(function (carYear) {
        carYear.cars.forEach(function (make) {
            make.models.forEach(function (model) {
                var depreciation = processDepreciation(model.styles[0].id);

                if (depreciation != null) {
                    model.styles[0].depreciation = depreciation;
                }
            });
        });
    });

    mongodb.insertDocuments(carYears, 'models_prices', function () {
        console.log('Job finished!');
        process.exit();
    });
});

function processDepreciation(styleId) {
    var depreciation = null;
    var fileName = 'json/prices/' + styleId + '.json';

    if (fs.existsSync(fileName)) {
        var content = fs.readFileSync(fileName, 'utf-8');
        depreciation = JSON.parse(content);
    }
    else {
        console.log(fileName + ' was not found, skipped!');
    }

    return depreciation;
}