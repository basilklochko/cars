// get styles by nice make name, nice model name, year
// https://api.edmunds.com/api/vehicle/v2/honda/pilot/2010/styles?view=full&fmt=json&api_key=jnd6yxft7sne2hpvxrphaasf
// styles list { id, name, price object }

// get price for style, condition, mileage, zip
// https://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid=101172636&condition=Average&mileage=10000&zip=90404&fmt=json&api_key=jnd6yxft7sne2hpvxrphaasf
// tmv - nationalBasePrice

var edmundsSettings = require('../settings/edmunds');
var request = require('request');
var mongodb = require('../services/mongodb');

console.log('Job started');

var stylesUrl = edmundsSettings.settings().stylesUrl + edmundsSettings.settings().key;
var stylesRequests = [];

mongodb.searchCollection(null, 'models').then(function(carYears) {
    carYears.forEach(function (carYear){
        var year = carYear.year;

        carYear.cars.forEach(function (car) {
            var makeName = car.niceName;

            car.models.forEach(function (model){
                var modelName = model.niceName;
                var url = stylesUrl.replace('{makeNiceName}', makeName).replace('{modelNiceName}', modelName).replace('{year}', year);

                var id = carYear.objectId;

                stylesRequests.push(url, id);
            });
        });
    });


});

function processStyle(url) {

}