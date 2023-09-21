$(document).ready(function () {
    $('#RemoveAll').hide();
    $('#Results').hide();

    $('#RemoveAll').click(function () {
        selectCarHelper.removeAll();
    });

    $(document).on('click', '.selected-car', function () {
        selectCarHelper.removeCar($(this));
    });

    $('#YearSelect').click(function () {
        selectCarHelper.addCar();
    });

    $('#Makes').change(function () {
        selectCarHelper.populateModels();
    });

    $('#Years').change(function () {
        selectCarHelper.getCars();
    });

    $('#Years').empty();

    for (var year = 2000; year <= (new Date).getFullYear(); year++) {
        $('#Years').append('<option val="1">' + year + '</option>');
    }

    selectCarHelper.getCars();
});

var selectCarHelper = {
    mileage: [],
    selectedCars: [],
    cars: null,
    renderCars: function () {
        if ($('#Cars .selected-car').length > 0) {
            $('#Results').show();

            var legendNames = [];
            var carPrices = [];

            $.each(this.selectedCars, function () {
                legendNames.push(this.car);
                carPrices.push(this.prices);
            });

            new Chartist.Line('#Results', {
                labels: this.mileage,
                series: carPrices
            }, {
                    height: '500px',
                    chartPadding: {
                        top: 20,
                        right: 0,
                        bottom: 30,
                        left: 0
                    },
                    axisY: {
                        onlyInteger: true
                    },
                    plugins: [
                        Chartist.plugins.ctAxisTitle({
                            axisX: {
                                axisTitle: 'Miles',
                                axisClass: 'ct-axis-title',
                                offset: {
                                    x: 0,
                                    y: 50
                                },
                                textAnchor: 'middle'
                            },
                            axisY: {
                                axisTitle: 'Price',
                                axisClass: 'ct-axis-title',
                                offset: {
                                    x: 50,
                                    y: 0
                                },
                                textAnchor: 'middle',
                                flipTitle: false
                            }
                        }),
                        Chartist.plugins.legend({
                            legendNames: legendNames,
                        })
                    ]
                });

            uiHelper.loaded();
        }
        else {
            $('#Results').hide();
        }
    },
    addCar: function () {
        var car = $('#Makes').val() + '/' + $('#Models').val() + '/' + $('#Years').val();
        var found = false;

        $('#Cars .selected-car').each(function () {
            if ($.trim($(this).text()) == car) {
                found = true;
            }
        });

        if (!found) {
            $('#Cars').append('<button type="button" class="btn btn-primary btn-sm selected-car">' + car + ' <span class="glyphicon glyphicon-remove-sign"></span></button>&nbsp;');
            this.getDepreciation();
        }

        this.checkCars();
    },
    removeCar: function (car) {
        var data = $.trim(car.text());

        $.each(this.selectedCars, function (index, item) {
            if (item != undefined && item.car == data) {
                selectCarHelper.selectedCars.splice(index, 1);
            }
        });

        car.remove();

        this.checkCars();
        this.renderCars();
    },
    removeAll: function () {
        this.selectedCars = [];
        this.renderCars();

        $('#Cars').empty();
        $('#RemoveAll').hide();
        $('#Results').hide();
    },
    checkCars: function () {
        if ($('#Cars .selected-car').length > 0) {
            $('#RemoveAll').show();
            $('#Results').show();
        }
        else {
            $('#RemoveAll').hide();
            $('#Results').hide();
        }
    },
    getDepreciation: function () {
        uiHelper.loading();

        var year = $('#Years').val();
        var make = $('#Makes').val();
        var model = $('#Models').val();
        var car = make + '/' + model + '/' + year;

        $.get('/api/carDepreciation/' + year + '/' + make + '/' + model, function (data) {
            if (data.length > 0) {
                var prices = [];
                selectCarHelper.mileage = [];

                $.each(data, function (index, item) {
                    selectCarHelper.mileage.push(item.mileage);
                    prices.push(item.price);
                });

                selectCarHelper.selectedCars.push({
                    car: car,
                    prices: prices
                });
            }

            selectCarHelper.renderCars();
        });
    },
    getCars: function () {
        uiHelper.loading();

        var year = $('#Years').val();

        $.get('/api/carsByYear/' + year, function (data) {
            if (data.length > 0) {
                $('#Makes').empty();

                cars = data[0].cars;

                $.each(cars, function () {
                    $('#Makes').append('<option val="' + this.name + '">' + this.name + '</option>');
                });

                selectCarHelper.populateModels();
            }

            uiHelper.loaded();
        });
    },
    populateModels: function () {
        $('#Models').empty();

        var make = $('#Makes').val();

        if (cars != null) {
            $.each(cars, function () {
                if (this.name == make) {
                    $.each(this.models, function () {
                        $('#Models').append('<option val="' + this.name + '">' + this.name + '</option>');
                    });
                }
            });
        }
    }
}
