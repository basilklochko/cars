exports.EdmundsCarData = function(req, res) {

    var reqMake = req.params.Make;
    var reqModel = req.params.Model;

    // TODO: Returned pages are still fixed
    var queryParameters = {
            Model: reqModel
         ,  Make:  reqMake
         ,  State: "NY"
    };

    
    res.setHeader('Content-Type', 'application/json');
    var sendBackEdmunds = function(json_array)
    {
        res.send(JSON.stringify(json_array));
    };
  
    ExtractEdmundsData(queryParameters, sendBackEdmunds);

};