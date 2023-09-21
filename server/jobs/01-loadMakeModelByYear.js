var edmundsSettings = require('../settings/edmunds');
var request = require('request');
var mongodb = require('../services/mongodb');

console.log('Job started');

mongodb.clearCollection('models');

processYear(2000);

function processYear(year) {
    console.log('Getting info for ' + year + ' year...');

    var cars = [];
    var url = edmundsSettings.settings().makesUrl + edmundsSettings.settings().key + '&year=' + year;
    var opts = {
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    };

    request(opts, function (err, res, body) {
        if (err) {
            console.log("Request ERROR Occured!!!" + err);
            return;
        }

        var response = JSON.parse(body);

        response.makes.forEach(function (make) {
            var item = {
                name: make.name,
                niceName: make.niceName
            };

            item.models = [];

            make.models.forEach(function (model) {
                var itemModel = {
                    name: model.name,
                    niceName: model.niceName
                };

                item.models.push(itemModel);
            });

            cars.push(item);
        });

        mongodb.insertDocuments({
            year: year,
            cars: cars
        }, 'models');

        var now = new Date();

        if (year == now.getFullYear()) {
            console.log('Job finished!');
            //process.exit();
        } else {
            year++;
            processYear(year);
        }
    });
}
