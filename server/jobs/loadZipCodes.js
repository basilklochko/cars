var fs = require('fs');
var mongodb = require('../services/mongodb');

console.log('Job started');

mongodb.clearCollection('zips');

var zips = [];

fs.readFile('us_postal_codes.csv', 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }

    var rows = data.split('\n');

    rows.forEach(function(row) {
        var zipCode = row.split(',');

        var zip = {
            zip: zipCode[0],
            place: zipCode[1],
            city: zipCode[2],
            state: zipCode[3],
            county: zipCode[4],
            latitude: zipCode[5],
            longitude: zipCode[6]
        };

        if (zip.zip != undefined && zip.zip != '' && zip.zip != 'Postal Code'){
            zips.push(zip);
        }
    });

    mongodb.insertDocuments(zips, 'zips', function () {
        setTimeout(function () {
            console.log('Job finished!');
            process.exit();
        }, 1000);
    });
});
