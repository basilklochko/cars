var uri_GoldenSource = "api/cardatasource/{0}/{1}/{2}";
var uri_CacheSource = "api/cardatacache/{0}/{1}";


var DataProvider = {
    ModelMakeData: null,

    getDataFromCache: function(make, model, callbackOutput) {
        var uriMM = uri_CacheSource
            .replace('{0}', make)
            .replace('{1}', model);
        $.ajax({
            url: uriMM,
            dataType: 'json'
        }).done(function(data) {
            callbackOutput(data, false);
        });
        // TODO: ERROR PROCESSING
    },
    getDataFromGoldenSource: function(make, model, callbackOutput) {
        uiHelper.loading();
        var maxPages = 1;
        var current_page = 1;

        var uriMM = uri_GoldenSource
            .replace('{0}', make)
            .replace('{1}', model);

        Accumulator.reset();

        var uri = uriMM.replace('{2}', current_page);
        $.ajax({
            url: uri,
            dataType: 'json'
        }).done(function(data) {
            if (!DataProvider.ValidateResponse(data)) {
                uiHelper.loaded(); // TODO: ugly code in this place
                return;
            }

            Accumulator.Append(data.CarsData);
            callbackOutput(data.CarsData, false);
            //TODO: pages
            if (data.MaxPages != undefined && data.MaxPages > 1) {
                maxPages = data.MaxPages;
                console.log("DataProvider, golden source: returned pages: " + maxPages);

                DataProvider.getDataGSRecursive(2, uriMM, maxPages, callbackOutput);
            }
            else
                console.log("DataProvider, golden source: Only one page returned");
        });

    },
    getDataGSRecursive: function(page, uriMM, maxPages, callbackOutput) {
        var uri = uriMM.replace('{2}', page);
        $.ajax({
            url: uri,
            dataType: 'json'
        }).done(function(data) {
            if (!DataProvider.ValidateResponse(data))
                return;

            Accumulator.Append(data.CarsData);
            callbackOutput(data.CarsData, true);
            page++;
            if (page <= maxPages)
                DataProvider.getDataGSRecursive(page, uriMM, maxPages, callbackOutput);
            else
                console.log(">>> Processed all additional pages successfully!");
        });
    },
    ValidateResponse: function(data) {
        if (data.CarsData == "*** Bad response from Autotrader ***") {
            console.log("Warning: Bad response recieved !!!");
            return false;
        }
        else
            return true;
    }
};


// TODO : create object to store data between cyclic calls
var Accumulator = {

    carsData: [
        []
    ], // main data storage

    Append: function(data) {
        // append to main data
        carsData.append(data);
    },


    getData: function() {
        // combine regression, header and main data
        return carsData;
    },

    reset: function() {
        carsData = [[]];
    }



};
