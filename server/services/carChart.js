function drawChart() {

	google.charts.load('current', {
		'packages': ['corechart']
	});
	google.charts.setOnLoadCallback(drawChart);

	// 2. convert to table form
	var data = google.visualization.arrayToDataTable([
		['Year', 'Sales', 'Expenses'],
		['2004', 1000, 400],
		['2005', 1170, 460],
		['2006', 660, 1120],
		['2007', 1030, 540]
	]);

	var options = {
		title: 'BMW 528 depreciation',
		curveType: 'function',
		legend: {
			position: 'bottom'
		}
	};

	var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
	chart.draw(data, options);
}

function drawChart1() {

	// TODO: I don't like these mess below:
	google.charts.load('current', {
		'packages': ['corechart']
	});
	google.charts.setOnLoadCallback(drawChart);


	// 1. get data from node js
	// http://localhost:3000/cardata/BMW/528I

	$.ajax({
			url: '/cardata/BMW/528I',
			dataType: 'json',
			crossDomain: true,
		})
		.done(function(data) {
			var items = [];
			alert('call worked out');
			$.each(data, function(key, val) {

				//items.push('<li id="' + key + '">' + val + '</li>');

			});

			// 2. convert to table form
			var data = google.visualization.arrayToDataTable([
				['Year', 'Sales', 'Expenses'],
				['2004', 1000, 400],
				['2005', 1170, 460],
				['2006', 660, 1120],
				['2007', 1030, 540]
			]);

			var options = {
				title: 'BMW 528 depreciation',
				curveType: 'function',
				legend: {
					position: 'bottom'
				}
			};

			var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
			chart.draw(data, options);
		})
		.fail(function(xhr, textStatus, errorThrown) {
			alert(xhr.responseText + "; " + textStatus + "; " + errorThrown);
		});
}
