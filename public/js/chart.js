$(document).ready(function () {

    new Chartist.Line('#chart1', {
        labels: [1, 2, 3, 4],
        series: [
            [100, null, 120, null, 110, null, 180, null, 200],
            [100, 110, 120, 213, 110, 132, 180, 200, 100]
        ]
    });
});
