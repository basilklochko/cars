exports.index = function(req, res) {
    res.render('index', {
        title: 'Car Depriciation Chart'
    });
};

exports.chart = function(req, res) {
    res.render('chart', {
        title: 'Car Depriciation Chart'
    });
};
