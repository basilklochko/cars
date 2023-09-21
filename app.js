// imports
var express = require('express');
var app_routes = require('./server/routes/app-routes');
var api_routes = require('./server/routes/api-routes');
var http = require('http');
var path = require('path');

var app = express();

// middleware registration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// app routes registration
app.get('/', app_routes.index);
app.get('/index', app_routes.index);

// TODO: Kill this shit please
//app.get('/cardata_test', api_routes.CarDataTest); // TODO: Obsolete
// app.get('/cardata/:Make/:Model', car_data_Autotrader.CarData); // TODO: Obsolete
// app.get('/edmunds/cardata/:Make/:Model', car_data_Edmunds.EdmundsCarData); // TODO: Obsolete

// api routes registration
app.get('/api/carDepreciation/:Year/:Make/:Model', api_routes.getCarDepreciation);
app.get('/api/carsByYear/:Year', api_routes.getMakeModelsByYear);
app.get('/api/cardatasource/:Make/:Model/:Page', api_routes.getMakeModelFromSource);
app.get('/api/cardatacache/:Make/:Model', api_routes.getMakeModelFromCache);
app.get('/api/cardataTest/TestSelectors', api_routes.TestSelectors);

// keeping the app alive
// setInterval(function () {
//     console.log('Pinging the app to keep it awake!');
//     http.get("http://carsdepreciation.herokuapp.com");
// }, 300000); // every 5 minutes (300000)

// app start
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
