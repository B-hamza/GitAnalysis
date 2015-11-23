'use strict'
angular.module('directives', []);

angular.module('directives').directive('repoInfos', function(){
	return{
		restruct:'E',
		templateUrl:'/assets/partials/repo-infos.html',
		link: function(scope,element,attrs){
			// ajouter l'élement dans la selection de la ligne
		}
	};
	
});

angular.module('directives').directive('pieChart',function(){
	return {
		// Callback qui crée et affiche la datatable, et la piechart
		restrict: 'E',
		replace: true,
        scope: {
            ngModel: '='
        },
        template : '<div  style="width: 900px; height: 500px;"></div>',
		link: function (scope, element,attrs) {
			// Create the data table.
			scope.$watch('ngModel', function() {
						var data = new google.visualization.DataTable();
						data.addColumn('string',
						'committers');
						data.addColumn('number',
						'Number of committers');
						
						data.addRows(scope.ngModel);
						
						var options = {
								title : 'My Daily Activities'
						};
						
						var chart = new google.visualization.PieChart(
								document.getElementById('piechart'));
						
						chart.draw(data, options);
				},true);

		}
	};
});


angular.module('directives').directive('timeLine',function(){
	return {
		// Callback qui crée et affiche la datatable, et la piechart
		restrict: 'E',
		replace: true,
        scope: {
            ngModel: '='
        },
        template : '<div  style="width: 900px; height: 500px;"></div>',
		link: function (scope, element,attrs) {
			// Create the data table.
			scope.$watch('ngModel', function() {
						
				},true);

		}
	};
});