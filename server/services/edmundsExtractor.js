// jquery dependencies
var request = require('request');
var jsdom = require("jsdom").jsdom,
    document = jsdom('<div/'),
    window = document.defaultView,
    $ = jQuery = require('jquery')(window);

// Global kind of constant. Tolerable.
var timeoutInMilliseconds = 20 * 1000;
var url = 'https://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid=101172637&condition=Outstanding&mileage=10000&zip=10305&fmt=json&api_key=knfbftvdscdarf28wjbcqums';

// TODO: FUGLY SHIT GLOBAL VARIABLE DETECTED !!!!!!!! 
var waiting = 0;
var reqResult = [];


function executeRequest(queryParameters, callback) {

    var urlExt = url;

    var opts = {
        url: urlExt,
        timeout: timeoutInMilliseconds,
        auth: {
            user: 'skossovs',
            pass: 'miraj555',
            sendImmediately: false
          },
        headers: {
            'User-Agent': 'request'
        }
    };


    console.log(urlExt);


    request(opts, function(err, res, data) {
        if (err) {
            console.dir("Request ERROR Occured!!!" + err);
            return;
        }

        //$.each(data, function(key, val) {
        //    reqResult.push(val);
        //  });
        reqResult.push(data);

        //console.log(callback);
        if (--waiting == 0) {
            callback(reqResult);
            // clean up old request results
            //reqResult = [];    
        }
        
    });
}


ExtractEdmundsData = function(queryParameters, callback) {

    waiting = 5;
    
    for (var i = waiting; i > 0; i--) {
        executeRequest(queryParameters, callback);
    }

    
};

