// jquery dependencies
var request = require('request');
var chalk = require('chalk');
var jsdom = require("jsdom").jsdom,
    document = jsdom('<div/'),
    window = document.defaultView,
    $ = jQuery = require('jquery')(window);

// Global kind of constant. Tolerable.
var timeoutInMilliseconds = 60 * 1000;

// TODO: declare all selectors here:


var url = 'http://www.autotrader.com/cars-for-sale/Used+Cars/NY' +
    '?endYear=2016' +
    '&startYear=2000' +
    '&listingType=used&listingTypes=used' +
    '&makeCode1={0}' +
    '&modelCode1={1}' +
    '&numRecords=100' +
    '&searchRadius=0' +
    '&sellerType=p' +
    '&sellerTypes=p' +
    '&showcaseListingId=0' +
    '&showcaseOwnerId=0' +
    '&sortBy=derivedpriceASC' +
    '&firstRecord={2}';

// TODO: FUGLY SHIT GLOBAL VARIABLE DETECTED !!!!!!!!
var waiting = 0;
//var pages = 1; // how many pages in request TODO: obsolete
var reqResult = [];

// TODO: Obsolete
function executeRequest(queryParameters, pageIndex, callback) {
    var recordStart = 100 * pageIndex;

    // replace placeholders
    var urlExt = url
        .replace('{0}', queryParameters.Make)
        .replace('{0}', queryParameters.Make)
        .replace('{1}', queryParameters.Model);

    if (pageIndex >= 0)
        urlExt = urlExt + recordStart; //with pages
    else {
        urlExt = urlExt + '0'; // no pages
    }

    var opts = {
        url: urlExt,
        timeout: timeoutInMilliseconds,
        headers: {
            'User-Agent': 'request'
        }
    };

    console.log(urlExt);

    request(opts, function(err, res, body) {
        if (err) {
            console.dir(chalk.red("Request ERROR Occured!!!" + err));
            return;
        }
        // call max page function once
        if (pageIndex == 0) {
            MaxPages(body);
        }

        $('body').append(body);

        var carsDiv = $(body).find('div.listing');
        var carsData = [];

        $.each(carsDiv, function() {
            var car = {
                name: $(this).find('span[data-birf-log]').text(),
                price: $(this).find('.primary-price span').text(),
                mileage: $(this).find('.mileage span').text(),
                year: "undefined"
            };
            var idxSpace = -1;

            //parsing name #1
            car.name = car.name.replace("Used", "");

            // parsing price
            car.price = car.price.replace("$", "").replace(",", "").trim();

            // parsing a year
            car.year = car.name.toUpperCase().trim();
            idxSpace = car.year.indexOf(' ');
            if (idxSpace != -1)
                car.year = car.year.slice(0, idxSpace);

            // parsing name #2
            // TODO: UGLY 2 times processing the name
            car.name = car.name.replace(car.year, "").trim();
            idxSpace = car.name.indexOf('\n');
            if (idxSpace != -1)
                car.name = car.name.slice(0, idxSpace);

            car.mileage = car.mileage.replace("miles", "").replace(",", "").trim();


            // validation before pushing into output array
            function carValidate(c) {
                var result = true;
                if (c.year == "undefined" || Number(c.year) == 0) result = false;
                if (c.mileage == "undefined" || Number(c.mileage) == 0) result = false;
                return result;
            };

            if (carValidate(car))
                carsData.push(car);
        });

        if (carsData != "undefined")
            console.log("Processed " + carsData.length + " cars, in page " + pageIndex + "...");
        else
            console.log("Warning: Page " + pageIndex + " returns no records");

        reqResult = reqResult.concat(carsData);
        $('body').html('');

        if (--waiting == 0) {
            callback(reqResult);
            if (pageIndex > 0 || pages == 1)
                reqResult = []; // forget old result as soon as it's been transferred.
        }
    });
}

// selector for pages
function MaxPages(body) {

    var pages = 0;
    var pagesDiv = $(body).find('.pageof');
    var selectorReturn = pagesDiv.text();
    var arr = selectorReturn.split(' ');
    if (arr.length > 3)
        pages = pagesDiv.text().split(' ')[3];
    else {
        console.log(chalk.red("can't define number of pages"));
        console.log(chalk.red("selector returns: " + selectorReturn));
        pages = 1;
    }

    console.log("Found number of pages: " + pages);
    return pages;

}

// TODO: this function is very UGLY it takes 14% of CPU just to wait.
function VeryBrutalWayToWait(delayInSec) {
    var end = Date.now() + delayInSec * 1000;
    while (Date.now() < end);
}

// TODO: obsolete it
ExtractData = function(queryParameters, callback) {


    var afterPages = function(data) {
        waiting = pages - 1;

        for (var pageIndex = 1; pageIndex < pages; pageIndex++) {
            VeryBrutalWayToWait(10); // with 10 secondes delay returns all pages consistently
            executeRequest(queryParameters, pageIndex, callback);
        }
    };

    waiting = 1; // assume one page only
    // Define pages in first query
    executeRequest(queryParameters, 0, afterPages);

};

exports.ExtractDataFromAutotraderOnePage = function(queryParameters, callback) {
    var pageIndex = queryParameters.Page - 1;
    var recordStart = 100 * pageIndex;

    // replace placeholders
    var urlExt = url
        .replace('{0}', queryParameters.Make)
        .replace('{0}', queryParameters.Make)
        .replace('{1}', queryParameters.Model)
        .replace("{2}", recordStart);

    var opts = {
        url: urlExt,
        timeout: timeoutInMilliseconds,
        headers: {
            'User-Agent': 'request'
        }
    };
    VeryBrutalWayToWait(5); // delay before send request to autotrader.
    console.log(urlExt);

    request(opts, function(err, res, body) {
        var carsDataResponse = {
            MaxPages: undefined,
            CarsData: []
        };
        var carsData = [];
        console.log(chalk.green((new Date()).toISOString() + ": recieved response from Autotrader. Run selectors <<<<<<<-------"));
        if (err) {
            console.dir(chalk.red("Request ERROR Occured!!!" + err));
            carsDataResponse.CarsData = "*** Bad response from Autotrader ***";
            callback(carsDataResponse);
            return;
        }

        // call max page function once
        if (queryParameters.PageCountRequired == true) {
            carsDataResponse.MaxPages = MaxPages(body); // TODO: check it !!!!
            if (carsDataResponse.MaxPages == 0) {
                console.log(chalk.red("ERROR: Recieved bad response from Autotrader!!!!"));
                carsDataResponse.CarsData = "*** Bad response from Autotrader ***";
                callback(carsDataResponse);
                return;
            }
        }
        $('body').append(body);

        var carsDiv = $(body).find('div.listing');


        $.each(carsDiv, function() {
            var car = {
                name: $(this).find('span[data-birf-log]').text(),
                price: $(this).find('.primary-price span').text(),
                mileage: $(this).find('.mileage span').text(),
                year: "undefined"
            };
            var idxSpace = -1;

            //parsing name #1
            car.name = car.name.replace("Used", "");

            // parsing price
            car.price = car.price.replace("$", "").replace(",", "").trim();

            // parsing a year
            car.year = car.name.toUpperCase().trim();
            idxSpace = car.year.indexOf(' ');
            if (idxSpace != -1)
                car.year = car.year.slice(0, idxSpace);

            // parsing name #2
            // TODO: UGLY 2 times processing the name
            car.name = car.name.replace(car.year, "").trim();
            idxSpace = car.name.indexOf('\n');
            if (idxSpace != -1)
                car.name = car.name.slice(0, idxSpace);

            car.mileage = car.mileage.replace("miles", "").replace(",", "").trim();


            // validation before pushing into output array
            function carValidate(c) {
                var result = true;
                if (c.year == "undefined" || Number(c.year) == 0) result = false;
                if (c.mileage == "undefined" || Number(c.mileage) == 0) result = false;
                return result;
            };

            if (carValidate(car))
                carsData.push(car);
        });
        console.log(chalk.green((new Date()).toISOString() + ": Selectors finished processing ---->>>>>"));

        if (carsData != undefined && carsData.length > 0)
            console.log("Processed " + carsData.length + " cars, in page " + pageIndex + "...");
        else
            console.log("Warning: Page " + pageIndex + " returns no records");

        $('body').html('');

        carsDataResponse.CarsData = carsData;
        callback(carsDataResponse);
    });

}
