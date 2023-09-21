var request = require('request');
var chalk = require('chalk');
var jsdom = require("jsdom").jsdom,
    document = jsdom('<div/'),
    window = document.defaultView,
    $ = jQuery = require('jquery')(window);



exports.BMW5data = function() {

    var carsData = [{
        name: "BMW 528i",
        price: "6900",
        mileage: "165000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "8300",
        mileage: "125000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "8900",
        mileage: "120000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "8950",
        mileage: "120992",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9500",
        mileage: "102000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9500",
        mileage: "103000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9500",
        mileage: "75000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10000",
        mileage: "105000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10200",
        mileage: "102950",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10500",
        mileage: "96500",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10500",
        mileage: "71713",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10990",
        mileage: "89000",
        year: "2009"
    }, {
        name: "BMW 528i",
        price: "10995",
        mileage: "103421",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "11390",
        mileage: "128000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "11500",
        mileage: "91000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "12985",
        mileage: "66270",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "12999",
        mileage: "112000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "13499",
        mileage: "90000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "14400",
        mileage: "95000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "14650",
        mileage: "94683",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "14900",
        mileage: "78000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "15500",
        mileage: "46521",
        year: "2009"
    }, {
        name: "BMW 528i",
        price: "15500",
        mileage: "75600",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "15900",
        mileage: "95900",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "16000",
        mileage: "59000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "17500",
        mileage: "71224",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "17900",
        mileage: "85150",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "18499",
        mileage: "68000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "18750",
        mileage: "90000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "19000",
        mileage: "75000",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "19500",
        mileage: "102000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "19999",
        mileage: "65500",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "20000",
        mileage: "67700",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "20500",
        mileage: "61100",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "21250",
        mileage: "67800",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "21500",
        mileage: "38000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "21500",
        mileage: "45000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "22888",
        mileage: "49999",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "23200",
        mileage: "42025",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "23500",
        mileage: "34500",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "23900",
        mileage: "40138",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "23900",
        mileage: "52583",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "23995",
        mileage: "51800",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "23999",
        mileage: "37000",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "24999",
        mileage: "49000",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "25000",
        mileage: "59981",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "25000",
        mileage: "73080",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "25000",
        mileage: "33000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "25995",
        mileage: "23300",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "27750",
        mileage: "45091",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "27950",
        mileage: "23980",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "28500",
        mileage: "45260",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "29450",
        mileage: "24000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "29900",
        mileage: "26300",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "30000",
        mileage: "33400",
        year: "2014"
    }, {
        name: "BMW 528i",
        price: "31500",
        mileage: "28093",
        year: "2014"
    }, {
        name: "BMW 528i",
        price: "31900",
        mileage: "51500",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "32000",
        mileage: "45497",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "33000",
        mileage: "30500",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "33997",
        mileage: "43440",
        year: "2014"
    }, {
        name: "BMW 528i",
        price: "39990",
        mileage: "19500",
        year: "2015"
    }, {
        name: "BMW 528i",
        price: "44900",
        mileage: "14800",
        year: "2015"
    }, {
        name: "BMW 528i",
        price: "49987",
        mileage: "7900",
        year: "2016"
    }, {
        name: "BMW 528i",
        price: "55000",
        mileage: "462",
        year: "2016"
    }, {
        name: "BMW 528i",
        price: "2500",
        mileage: "186640",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "2800",
        mileage: "167125",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "3200",
        mileage: "134000",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "3500",
        mileage: "255000",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "3950",
        mileage: "116000",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "3995",
        mileage: "167901",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "4200",
        mileage: "125000",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "5000",
        mileage: "159000",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "5000",
        mileage: "119263",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "6000",
        mileage: "195000",
        year: "2000"
    }, {
        name: "BMW 528i",
        price: "8700",
        mileage: "97000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9000",
        mileage: "103000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9000",
        mileage: "120001",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9400",
        mileage: "80200",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9499",
        mileage: "83800",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9500",
        mileage: "114048",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9900",
        mileage: "112500",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "9999",
        mileage: "104395",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10000",
        mileage: "77256",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10500",
        mileage: "108000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10500",
        mileage: "101425",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10800",
        mileage: "93800",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "10900",
        mileage: "123000",
        year: "2009"
    }, {
        name: "BMW 528i",
        price: "11000",
        mileage: "164000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "11900",
        mileage: "88000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "11900",
        mileage: "72394",
        year: "2009"
    }, {
        name: "BMW 528i",
        price: "11950",
        mileage: "52000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "11995",
        mileage: "83000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "12000",
        mileage: "97000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "12000",
        mileage: "102000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "12000",
        mileage: "33000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "12195",
        mileage: "117500",
        year: "2009"
    }, {
        name: "BMW 528i",
        price: "12500",
        mileage: "112000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "12500",
        mileage: "72587",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "12750",
        mileage: "95000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "12900",
        mileage: "125016",
        year: "2009"
    }, {
        name: "BMW 528i",
        price: "13000",
        mileage: "77500",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "13500",
        mileage: "112000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "14000",
        mileage: "82000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "14495",
        mileage: "98000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "14799",
        mileage: "57000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "14825",
        mileage: "111744",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "14900",
        mileage: "82000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "14900",
        mileage: "61500",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "14900",
        mileage: "87800",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "14900",
        mileage: "80000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "14900",
        mileage: "57500",
        year: "2009"
    }, {
        name: "BMW 528i",
        price: "14950",
        mileage: "79000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "15000",
        mileage: "105000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "15700",
        mileage: "77000",
        year: "2009"
    }, {
        name: "BMW 528i",
        price: "15999",
        mileage: "80500",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "16000",
        mileage: "71000",
        year: "2008"
    }, {
        name: "BMW 528i",
        price: "16000",
        mileage: "65000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "16595",
        mileage: "81000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "16700",
        mileage: "61000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "16900",
        mileage: "64000",
        year: "2010"
    }, {
        name: "BMW 528i",
        price: "16900",
        mileage: "70500",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "17000",
        mileage: "72600",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "17500",
        mileage: "52000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "17900",
        mileage: "67840",
        year: "2009"
    }, {
        name: "BMW 528i",
        price: "17900",
        mileage: "73000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "17900",
        mileage: "69200",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "18000",
        mileage: "54405",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "18100",
        mileage: "76000",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "20000",
        mileage: "52731",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "20500",
        mileage: "58551",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "20900",
        mileage: "29000",
        year: "2014"
    }, {
        name: "BMW 528i",
        price: "21500",
        mileage: "42000",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "21500",
        mileage: "41000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "21600",
        mileage: "44955",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "21900",
        mileage: "59000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "21900",
        mileage: "56500",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "22000",
        mileage: "65000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "22000",
        mileage: "37000",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "22200",
        mileage: "55450",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "22500",
        mileage: "67000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "22900",
        mileage: "34000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "22955",
        mileage: "75000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "22995",
        mileage: "50300",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "23400",
        mileage: "46400",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "23800",
        mileage: "79400",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "23995",
        mileage: "61700",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "23999",
        mileage: "39873",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "23999",
        mileage: "43717",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "24000",
        mileage: "53000",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "24000",
        mileage: "54000",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "24500",
        mileage: "44002",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "24750",
        mileage: "51000",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "24900",
        mileage: "44500",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "24900",
        mileage: "66000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "25000",
        mileage: "67900",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "25000",
        mileage: "39000",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "25500",
        mileage: "46700",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "25900",
        mileage: "49046",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "25995",
        mileage: "43927",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "26500",
        mileage: "39000",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "26900",
        mileage: "38500",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "27300",
        mileage: "36516",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "27500",
        mileage: "56000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "27995",
        mileage: "30063",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "28000",
        mileage: "50000",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "28500",
        mileage: "36200",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "28500",
        mileage: "27200",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "28500",
        mileage: "29800",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "29000",
        mileage: "42000",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "29500",
        mileage: "56825",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "29900",
        mileage: "44000",
        year: "2013"
    }, {
        name: "BMW 528i",
        price: "29999",
        mileage: "30017",
        year: "2012"
    }, {
        name: "BMW 528i",
        price: "31000",
        mileage: "22128",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "32900",
        mileage: "15800",
        year: "2011"
    }, {
        name: "BMW 528i",
        price: "33499",
        mileage: "38000",
        year: "2014"
    }, {
        name: "BMW 528i",
        price: "34500",
        mileage: "41600",
        year: "2014"
    }, {
        name: "BMW 528i",
        price: "38900",
        mileage: "18000",
        year: "2014"
    }, {
        name: "BMW 528i",
        price: "39999",
        mileage: "38999",
        year: "2015"
    }, {
        name: "BMW 528i",
        price: "42000",
        mileage: "27000",
        year: "2015"
    }, {
        name: "BMW 528i",
        price: "43995",
        mileage: "1728",
        year: "2015"
    }, {
        name: "BMW 528i",
        price: "48600",
        mileage: "5400",
        year: "2015"
    }];
    return carsData;
}

// sample data to be sent
exports.CarDataTest = function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>   Test Data sent !!");
    res.send(JSON.stringify(BMW5data()));
};

exports.CarData = function(req, res) {

    var reqMake = req.params.Make;
    var reqModel = req.params.Model;

    // TODO: Returned pages are still fixed
    var queryParameters = {
        Model: reqModel,
        Make: reqMake,
        State: "NY",
        MaxPageIndex: 2
    };


    res.setHeader('Content-Type', 'application/json');
    var sendBack = function(cd) {
        res.send(JSON.stringify(cd));
    };

    ExtractData(queryParameters, sendBack);

};


exports.SelectorsTest = function(callback) {
    var uri = "http://www.autotrader.com/cars-for-sale/Used+Cars/NY?endYear=2016&startYear=2000&listingType=used&listingTypes=used&makeCode1=BMW&modelCode1=528I&numRecords=100&searchRadius=0&sellerType=p&sellerTypes=p&showcaseListingId=0&showcaseOwnerId=0&sortBy=derivedpriceASC&firstRecord=0";

    var opts = {
        url: uri,
        timeout: 10000,
        headers: {
            'User-Agent': 'request'
        }
    };

    request(opts, function(err, res, body) {

        var test_result = {
            STATUS: "PASSED",
            MESSAGE: "Nothing tested"
        };

        var return_func = function(s, m) {
            test_result.STATUS = s;
            test_result.MESSAGE = m;
            callback(test_result);
        };

        console.log(chalk.green(">>> Testing Paging selector"));

        $('body').append(body);
        //'.pageof'
        //'span[data-reactid]'
        //$('strong[data-reactid]')
        var pagesTag = $(body).find('div[data-qaid="pager"]');
        var selectorReturn = pagesTag.text();

        if (selectorReturn.length == 0) {
            console.log(chalk.red("!!!! Paging selector is not working !!!!"));
            return_func("ERROR", "Paging Selector Failed");

        }
        else {
            console.log("Content of Page Tag:");
            console.log(selectorReturn);

        }

        console.log(chalk.green(">>> Testing Cars selector"));

        var CarsTags = $(body).find('strong[data-reactid]'); // cars data selector
        selectorReturn = CarsTags.text();

        if (selectorReturn.length == 0) {
            console.log(chalk.red("!!!! Cars selector is not working !!!!"));
            return_func("ERROR", "Cars Selector Failed");
        }

        var counter = 0;

        var car = {
            name: "",
            price: "",
            mileage: "",
            year: undefined,
            color: undefined,
            shift: 0

        };
        var setValue = function(data) {
            console.log("work");
            if (car.shift == 0 && data.indexOf('Used') == -1)
                return;
            switch (car.shift) {
                case 0:
                    car.name = data;
                    break;
                case 1:
                    car.price = data;
                    break;
                case 2:
                    car.mileage = data;
                    break;
                case 3:
                    car.year = data;
                    break;
                case 4:
                    car.color = data;
                    break;
                default:
                    car.shift = -1;
                    break;
            }
            car.shift++;


        }

        $.each(CarsTags, function() {

            setValue($(this).text());

            counter++;
            console.log("car name: " + car.name);
            console.log("car price: " + car.price);
            console.log("car mileage: " + car.mileage);
            console.log("car year: " + car.year);

        });

        if (counter == 0) {
            console.log(chalk.red("Didn't return or process a single car"));
            return_func("ERROR", "Didn't return or process a single car");
        }

        return_func("SUCCESS", "Tested all selectors");
    });

};
