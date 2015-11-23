'use strict'
angular.module('directives', []);

angular.module('directives').directive('repoInfos', function(){
	return{
		restruct:'E',
		templateUrl:'/assets/partials/repo-infos.html'
	};
	
});

angular.module('directives').directive('pieChart',function(){
	return {
		// Callback qui crée et affiche la datatable, et la piechart
		scope:true,
		link: function (attributes,$scope) {
			// Create the data table.
			function drawChart() {
						var data = new google.visualization.DataTable();
						data.addColumn('string',
						'committers');
						data.addColumn('number',
						'Number of committers');
						
						data.addRows(attributes.$parent.CommitersCount);
						
						var options = {
								title : 'My Daily Activities'
						};
						
						var chart = new google.visualization.PieChart(
								document.getElementById('piechart'));
						
						chart.draw(data, options);
				};
				drawChart();

		}
	};
});