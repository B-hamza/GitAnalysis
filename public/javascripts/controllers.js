'use strict';
// définition des contrôleurs

angular.module('routeAppControllers', []);

angular.module('routeAppControllers').controller('rootController', function($scope,$routeParams,$location){
	$scope.message = "this is the analyics";
	$scope.input = $routeParams.input;
	$scope.enterTodo = function(input,event){
		if(event.keyCode ==13){ // ENTER_KEY
			$location.path('/search/'+input);
		}
	}
});



angular.module('routeAppControllers').controller('SearchController', function($scope,$routeParams, $http) {
    $scope.results = [];
    $scope.itemPage = 10; // mettre la pagination à 10
    $scope.input = $routeParams.input;
    $scope.doSearch = function() {
        var httpRequest = $http({
            method : 'GET',
            url : "/search/" + $scope.input,
        }).success(function(data, status) {
            $scope.results = data;
        }).error(function(arg) {
            alert("error ");
        });
         
    };
    $scope.numselectionbypage=0;// pour la mise a jour du selectedRow lors de la pagination
    $scope.selectedRow = null;
    $scope.setClickedRow = function(index){  // mettre le selectedRow à la valeur d'index à chaque clique
    	$scope.selectedRow = index;
    	
    	if(document.getElementById('cellAdded')) {
    		document.getElementById("cellAdded").remove();
    	}else{
        console.log("selectedRow : "+$scope.selectedRow+ " index : "+index);
        var row = document.getElementById('repositories').insertRow(index+2);
        row.setAttribute("id","cellAdded");
        prepareRow(row);
    	}
     }
    function prepareRow(row){
        row.setAttribute("height","150");
        var cell1 = row.insertCell(0);
        cell1.setAttribute("colspan",4);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = githubRepoCard($scope.results[$scope.selectedRow+$scope.numselectionbypage]);
        cell2.innerHTML = "<a href=\"\#/analytics/"+$scope.results[$scope.selectedRow+$scope.numselectionbypage].id+"\""+" class=\"btn btn-default pull-right\">Analytics</a>"
    }
    
    function githubRepoCard(repo){
    	/*
    	 * div header contains Name repo and the owner infos
    	 * div content contains description of repo and url 
    	 * div footer contains Forks na Stars
    	 */
    	return "<div class=github-repo>" +
    						"<div class =header> <a href="+repo.html_url+">"+repo.name+"</a>" +
    						"<span>Created by <a href="+repo.owner.html_url+" target=_top>"+repo.owner.login+"</a></span>  </div>"+
    						
    						"<div class =content> <p >"+repo.description+"</p>" +
    						"</div>"+
    						"</div>"
    	
    }
    
    $scope.pageChangeHandler = function(num) { 
    	$scope.numselectionbypage = (num-1)*$scope.itemPage
    };
// chercher au chargement de la page
    $scope.doSearch();
});


angular.module('routeAppControllers').controller('AnalyticsController',
				function($scope, $routeParams, $http) {
					$scope.input = $routeParams.input;
					$scope.itemPage = 10;
					$scope.commits = [];
					$scope.doGetCommitsFromRepo = function(callback) {
					$http({
						method : 'GET',
						url : "/repositories/" + $scope.input,
					}).success(
					function(data, status) {
						$scope.commits = data;
						/* somme le nombre de commit par
						 *	committers rends => ObjectJson :
						 *	{"committer":"n (nombre de
						 *	commit)"}
						 */
						var committersCount = data
								.reduce(
										function(acc, curr) {
											curr = curr.commit.committer.name;
											if (typeof acc[curr] == 'undefined') {
												acc[curr] = 1;
											} else {
												acc[curr] += 1;
											}
	
											return acc;
										}, {});
						/*
						 * pour google chart accepte une
						 * array of elements utilisation de
						 * map pour transformer l'objet
						 * committersCount a un tableau de
						 * committer et nmbr de commit
						 */
						$scope.CommitersCount = Object
								.keys(committersCount)
								.map(
										function(curr) {
											var newObj = [];
											newObj.push(curr,
															committersCount[curr]);
											return newObj;
										})
	
					// Callback qui crée et affiche la datatable, et la piechart
						function drawChart() {
	
							// Create the data table.
							var data = new google.visualization.DataTable();
							data.addColumn('string',
									'committers');
							data.addColumn('number',
									'Number of committers');
							data.addRows($scope.CommitersCount);
	
							var options = {
								title : 'My Daily Activities'
							};
	
							var chart = new google.visualization.PieChart(
									document.getElementById('piechart'));
	
							chart.draw(data, options);
	
						}
						drawChart();
	
					}).error(function(arg) {
									alert("error ");
								});

					};

					$scope.doGetCommitsFromRepo();
				});

