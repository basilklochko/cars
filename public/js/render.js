var dataReady = true;
var carsDataHeader = ['Milage', 'Price', 'Regressed']; // Google graph requires to have header row in data array.
var carsData = [
    []
]; // Cars data array, stores data recieved from nodejs service

$(document).ready(function() {
    $('#Years').on('change', CheckDataRediness);
    $('#Makes').on('change', CheckDataRediness);
    $('#Models').on('change', CheckDataRediness);
});

google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(function() {
    $('#YearSelect').click(drawRequest);
});

function CheckDataRediness() {
    dataReady = true; // TODO: temporary switch source of  data
}

// TODO:
// 1. When user selects either year, make or model the request is send to the server that returns the flag if data in the mongo already.
// 2. Data-redinness flag is set.
// 3. Depending on data rediness we go for data-retrieval-cycle or mongo. DONE.
// 4. While data-retrieval is going on the server and sending back to UI the mongo is being populated as well.
// 5. Implement Model view with fields: Make, Model, AutotraderID, YearStart, YearEnd
// 6. Regression values should not be stored but recalculated everytime against accumulated array

function drawRequest() {

    $('#Results').hide();
    // TODO: DEBUG is needed
    if (dataReady)
        DataProvider.getDataFromCache($('#Makes').val(), $('#Models').val(),
            function(data, appendData) {
                new drawChart(data, appendData);
            });
    else
        DataProvider.getDataFromGoldenSource($('#Makes').val(), $('#Models').val(),
            function(data, appendData) {
                new drawChart(data, appendData);
            });
}


function drawChart(data, appendData) {

    var selectedYear = $('#Years :selected').text();
    if (data.length == 0) {
        console.log("Warning: there is no data to display. geting out.");
        uiHelper.loaded();
        return;
    }
    if (!appendData)
        carsData = [carsDataHeader]; // reset previous array if new data is coming


    $('#Results').show();
    // price from milage for now and sliced by fixed year
    var grepped_data = $.grep(data, function(a) {
            return a.year == selectedYear;
        })
        .sort(function(a, b) {
            return Number(a.mileage) - Number(b.mileage);
        });

    console.log("Number of cars : " + grepped_data.length + " per year " + selectedYear);

    // prepare regression
    var arrXY = [];
    $.each(grepped_data, function(key, val) {
        var p = {
            x: Number(val.mileage),
            y: Number(val.price)
        };
        arrXY.push(p);
    });
    var reg_arrXY = QuadraticRegression(arrXY);
    if (reg_arrXY.length == 0) {
        console.log("Warning: Skip this drawing call since the regression data is missing.");
        uiHelper.loaded();
        return;
    }
    var i = 0;
    $.each(grepped_data, function(key, val) {
        var car = [Number(val.mileage), Number(val.price), reg_arrXY[i].y];
        carsData.push(car);
        i++;
    });

    var carTitle = $('#Makes').val() + ' ' + $('#Models').val() + ' ' + $('#Years').val();
    $('#CarTitle').text(carTitle);

    var options = {
        title: carTitle,
        curveType: 'function',
        legend: {
            position: 'bottom'
        }
    };
    var chart = new google.visualization.ScatterChart(document.getElementById('curve_chart'));

    chart.draw(google.visualization.arrayToDataTable(carsData), options);

    uiHelper.loaded();
}






function drawChart_OBSOLETE() {
    uiHelper.loading();
    $('#Results').hide();

    // ****************************
    // real uri
    //var uri = 'cardata/BMW/528I';
    // test uri
    var uri = '/cardata_test';
    // ****************************


    var selectedYear = $('#Years :selected').text();
    // console.log("Filtering by year: " + selectedYear);
    var carsData = [
        ['Milage', 'Price', 'Regressed']
    ];
    $.ajax({
            url: uri,
            dataType: 'json'
        })
        .done(function(data) {
            $('#Results').show();

            // price from milage for now and sliced by fixed year
            var grepped_data = $.grep(data, function(a) {
                    return a.year == selectedYear;
                })
                .sort(function(a, b) {
                    return Number(a.mileage) - Number(b.mileage);
                });

            console.log("Number of cars : " + grepped_data.length + " per year " + selectedYear);

            // prepare regression
            var arrXY = [];
            $.each(grepped_data, function(key, val) {
                var p = {
                    x: Number(val.mileage),
                    y: Number(val.price)
                };
                arrXY.push(p);
            });
            var reg_arrXY = QuadraticRegression(arrXY);
            var i = 0;
            $.each(grepped_data, function(key, val) {
                var car = [Number(val.mileage), Number(val.price), reg_arrXY[i].y];
                carsData.push(car);
                i++;
            });

            var carTitle = $('#Makes').val() + ' ' + $('#Models').val() + ' ' + $('#Years').val();
            $('#CarTitle').text(carTitle);

            var options = {
                title: carTitle,
                curveType: 'function',
                legend: {
                    position: 'bottom'
                }
            };
            var chart = new google.visualization.ScatterChart(document.getElementById('curve_chart'));

            chart.draw(google.visualization.arrayToDataTable(carsData), options);

            uiHelper.loaded();
        });
}




// array XY must be sorted by X
function QuadraticRegression(arrXY) {
    //1. Prepare variables
    var arrRegressionData = [];

    var n = arrXY.length;
    var Ex = 0;
    var Ex2 = 0;
    var Ex3 = 0;
    var Ex4 = 0;
    var Ey = 0;
    var Exy = 0;
    var Ex2y = 0;

    // Equation system matrix
    var ms = new Array(3);
    for (var i = 0; i < 3; i++)
        ms[i] = new Array(3);

    var vs = new Array(3);

    // Adjucent Matrix
    var madj = new Array(3);
    for (var i = 0; i < 3; i++)
        madj[i] = new Array(3);

    var determinantA = 0;

    var a = new Array(3);


    //2. Calculate sums
    $.each(arrXY, function(index, p) {
        Ex += p.x;
        Ex2 += p.x * p.x;
        Ex3 += p.x * p.x * p.x;
        Ex4 += p.x * p.x * p.x * p.x;

        Ey += p.y;
        Exy += p.x * p.y;
        Ex2y += p.x * p.x * p.y;
    });

    //console.log("PASSED. Verify Ex, Ex, Ex3, Ex4: " + Ex + "|" + Ex2 + "|" + Ex3 + "|" + Ex4 + "|");
    //console.log("PASSED. Verify Ey, Exy, Ex2y: " + Ey + "|" + Exy + "|" + Ex2y + "|");


    //3. Assing Equation System Matrix
    ms[0][0] = n;
    ms[0][1] = Ex;
    ms[0][2] = Ex2;
    ms[1][0] = Ex;
    ms[1][1] = Ex2;
    ms[1][2] = Ex3;
    ms[2][0] = Ex2;
    ms[2][1] = Ex3;
    ms[2][2] = Ex4;

    vs[0] = Ey;
    vs[1] = Exy;
    vs[2] = Ex2y;


    //4. Calculate Determinant
    determinantA = ms[0][0] * (ms[1][1] * ms[2][2] - ms[1][2] * ms[2][1]);
    //console.log("1 Determinant A:" + (ms[0][0] * (ms[1][1] * ms[2][2] - ms[1][2] * ms[2][1])));
    determinantA -= ms[0][1] * (ms[1][0] * ms[2][2] - ms[1][2] * ms[2][0]);
    //console.log("2 Determinant A:" + (ms[0][1] * (ms[1][0] * ms[2][2] - ms[1][2] * ms[2][0])));
    determinantA += ms[0][2] * (ms[1][0] * ms[2][1] - ms[1][1] * ms[2][0]);
    //console.log("3 Determinant A:" + (ms[0][2] * (ms[1][1] * ms[2][1] - ms[1][1] * ms[2][0])));

    console.log(" Determinant A:" + determinantA);

    // No Determinant => No Solution
    if (determinantA == 0)
        return arrRegressionData;
    else
        determinantA = 1 / determinantA;
    //5. Calculate Adjunction Matrix

    madj[0][0] = (ms[1][1] * ms[2][2] - ms[1][2] * ms[2][1]) * determinantA;
    madj[0][1] = -(ms[1][0] * ms[2][2] - ms[1][2] * ms[2][0]) * determinantA;
    madj[0][2] = (ms[1][0] * ms[2][1] - ms[1][1] * ms[2][0]) * determinantA;

    madj[1][0] = -(ms[0][1] * ms[2][2] - ms[0][2] * ms[2][1]) * determinantA;
    madj[1][1] = (ms[0][0] * ms[2][2] - ms[0][2] * ms[2][0]) * determinantA;
    madj[1][2] = -(ms[0][0] * ms[2][1] - ms[0][1] * ms[2][0]) * determinantA;

    madj[2][0] = (ms[0][1] * ms[1][2] - ms[0][2] * ms[1][1]) * determinantA;
    madj[2][1] = -(ms[0][0] * ms[1][2] - ms[0][2] * ms[1][0]) * determinantA;
    madj[2][2] = (ms[0][0] * ms[1][1] - ms[1][0] * ms[1][0]) * determinantA;

    //6. Calculate a0, a1, a2
    a[0] = madj[0][0] * vs[0] + madj[0][1] * vs[1] + madj[0][2] * vs[2];
    a[1] = madj[1][0] * vs[0] + madj[1][1] * vs[1] + madj[1][2] * vs[2];
    a[2] = madj[2][0] * vs[0] + madj[2][1] * vs[1] + madj[2][2] * vs[2];


    //7. create output array
    // 7.1. chart scaling Axis X definition..
    // TODO: SHAME ON nodeJS. It doesn't know LOGARITHM !!!!!
    //var a0 = arrXY[0];
    //var an = arrXY[arrXY.length - 1];
    //var M = 20;
    //var delta = (an - a0) / M;
    ///// 7.2. main scaling variables:
    //var _x_ = Math.round(an / (Math.round(Math.ln(delta) / Math.ln(10))));
    //var b0 = 0.5 * (a0 + an - _x_ * M);

    for (var ii = 0; ii < arrXY.length; ii++) {
        //var x = b0 * _x_ * i; TODO: not so simple google chart cannot handle 2 separate graphs. It is needed to merge 2 sequencies
        var x1 = arrXY[ii].x; // not beatiful indeed
        var y1 = a[0] + a[1] * x1 + a[2] * x1 * x1; // TODO: dont forget _x_
        var p = {
            x: x1,
            y: y1
        };
        arrRegressionData.push(p);
    }

    console.log(">>> regression sequence successfully calculated");
    return arrRegressionData;

}
