exports.settings = function() {
    return {
        key: 'jnd6yxft7sne2hpvxrphaasf',
        makesUrl: 'https://api.edmunds.com/api/vehicle/v2/makes?state=used&view=basic&fmt=json&api_key=',
        stylesUrl: 'https://api.edmunds.com/api/vehicle/v2/{makeNiceName}/{modelNiceName}/{year}/styles?view=full&fmt=json&api_key=',
        pricesUrl: 'https://api.edmunds.com/v1/api/tmv/tmvservice/calculateusedtmv?styleid={styleid}&condition=Average&mileage={mileage}&zip={zip}&fmt=json&api_key='
    }
};
