'use strict'
angular.module('directives', []);

angular.module('directives').directive('repoInfos', function(){
	return{
		restruct:'E',
		templateUrl:'/assets/javascripts/directives/html/repoinfos.html',
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
        template : '<div class="centered" style="width: 900px; height: 400px;"></div>',
		link: function (scope, element,attrs) {
			// Create the data table.
			scope.$watch('ngModel', function() {
						if(scope.$parent.commits!=null){ // do not desplay until commits data is not empty
							document.getElementById('charts').removeAttribute("hidden");
						}
						var data = new google.visualization.DataTable();
						data.addColumn('string',
						'committers');
						data.addColumn('number',
						'Number of commits');
						
						data.addRows(scope.ngModel);
						
						var options = {
								title : 'The impact of committers',
								width: 600,
						        height: 400,
						};
						
						var chart = new google.visualization.PieChart(
								document.getElementById('piechart'));
						
						chart.draw(data, options);
						
						
				},true);

		}
	};
});


angular.module('directives').directive('barChart',function(){
	return {
		restrict: 'E',
		scope : {
			ngModel: '='
		},
		template : '<div style="width: 900px; height: 300px;" > </div>',
		link: function(scope,element,attrs){
			   scope.$watch('ngModel', function() {
				  // var data= google.visualization.DataTable();
				      var data = new google.visualization.DataTable();
						data.addColumn('string',
						'committers');
						data.addColumn('number',
						'Number of commits');
						
						data.addRows(scope.ngModel);

				      var view = new google.visualization.DataView(data);
				      view.setColumns([0,1,
				                       { calc: "stringify",
				                         sourceColumn: 1,
				                         type: "string",
				                         role: "annotation"
				                         }]);

				      var options = {
				        title: "Number of commits per user",
				        width: 600,
				        height: 400,
				        bar: {groupWidth: "95%"},
				        legend: { position: "none" },
				      };
				      var chart = new google.visualization.BarChart(document.getElementById("barchart"));
				      chart.draw(view, options);
				  });
		}
	}
	
});

angular.module('directives').directive('timeline',function(){
	return {
		// Callback qui crée et affiche la datatable, et la piechart
		restrict: 'E',
		replace: true,
        templateUrl : '/assets/javascripts/directives/html/timeline.html',
		link: function (scope, element,attrs) {
			// Create the data table.
			scope.$watch('commits', function(){
				if(scope.commits!=null){
					scope.current = 0;
					scope.itemsPerPage = 10;
					scope.disableNewButton = true;
					scope.disableOldButton = scope.current<(scope.commits.length/10) ? false:true;
				scope.newer = function(){
					console.log("this is new current : "+scope.current);
					if(scope.current>0){
						scope.current--;
						scope.disableOldButton = false;
					}else{
						scope.disableNewButton = true;
					}
				}
				scope.older = function(){
					console.log("this is old current : "+scope.current);
					if(scope.current<(scope.commits.length/10)-1){
						scope.current++;
						scope.disableNewButton = false;
					}else{
						scope.disableOldButton = true;
					}
				}
				}
			});
		}

	};
}).filter('visual', function() {
	  return function(input, start) {
		  if(!input){ return false;}
		    start = parseInt(start, 10);
		    return input.slice(start);
		  };
});


angular.module('directives').directive('timelineChart',function(){
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
				  var container = document.getElementById('timelinechart');
				  var chart = new google.visualization.Timeline(container);
				  var dataTable = new google.visualization.DataTable();
				  dataTable.addColumn({ type: 'string', id: 'Name' });
				  dataTable.addColumn({ type: 'date', id: 'Start' });
				  dataTable.addColumn({ type: 'date', id: 'End' });
				  dataTable.addRows(scope.ngModel);
				  
				  var options = {
					        title: "timeline of commits",
					        width: 500,
					        height: 200,
					      };

				  chart.draw(dataTable,options);
				},true);
		}
	};
});
