'use strict'
angular.module('directives', []);

angular.module('directives').directive('repoInfos', function(){
	return{
		restruct:'E',

		templateUrl:'/assets/partials/repo-infos.html',
		link: function(scope,element,attrs){
			// ajouter l'élement dans la selection de la ligne
			scope.$watch('selectedRow', function(){
			if(scope.results!=null){
			if(document.getElementById('rowAdded')) {
	    		document.getElementById("rowAdded").remove();
	    	}
	        console.log("index : "+scope.selectedRow+" result "+scope.results[scope.selectedRow+scope.numselectionbypage].id);
	        var row = document.getElementById('repositories').insertRow(scope.selectedRow+2);
	        row.setAttribute("id","rowAdded");
	        row.setAttribute("height","150");
	        var cell1 = row.insertCell(0);
	        cell1.setAttribute("colspan",5);
	        var elmnt = document.getElementById('reposInfos').cloneNode(true);
	        elmnt.setAttribute('ng-show',true);
	        elmnt.setAttribute('class',"");
	        cell1.appendChild(elmnt);
			}
			},true);
			
			scope.$watch('numselectionbypage', function(){
				if(document.getElementById('rowAdded')) {
		    		document.getElementById("rowAdded").remove();
		    	}
				
			},true);
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
        template : '<div  style="height: 180px;"></div>',
		link: function (scope, element,attrs) {
			// Create the data table.
			scope.$watch('ngModel', function(){
				  var container = document.getElementById('timeline');
				  var chart = new google.visualization.Timeline(container);
				  var dataTable = new google.visualization.DataTable();
				  dataTable.addColumn({ type: 'string', id: 'Position' });
				  dataTable.addColumn({ type: 'date', id: 'Start' });
				  dataTable.addColumn({ type: 'date', id: 'End' });
				  dataTable.addRows([
				    [ 'President',  new Date(1789, 3, 30), new Date(1789, 3, 30) ],
				    [ 'President',  new Date(1797, 2, 4), new Date(1797, 2, 4) ],
				    [ 'President',  new Date(1801, 2, 4), new Date(1801, 2, 4) ],
				    [ 'Vice President',  new Date(1789, 3, 21), new Date(1789, 3, 21)],
				    [ 'Vice President',  new Date(1797, 2, 4), new Date(1797, 2, 4)],
				    [ 'Vice President',  new Date(1801, 2, 4), new Date(1801, 2, 4)],
				    [ 'Vice President',  new Date(1805, 2, 4), new Date(1805, 2, 4)],
				    [ 'Secretary of State',  new Date(1789, 8, 25), new Date(1789, 8, 25)],
				    [ 'Secretary of State', new Date(1790, 2, 22), new Date(1790, 2, 22)],
				    [ 'Secretary of State', new Date(1794, 0, 2), new Date(1794, 0, 2)],
				    [ 'Secretary of State', new Date(1795, 7, 20), new Date(1795, 7, 20)]
				  ]);


				  chart.draw(dataTable);
				},true);

		}
	};
});