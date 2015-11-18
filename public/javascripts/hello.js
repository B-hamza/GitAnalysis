'use strict';


// déclaration de l'application routeApp

var app = angular.module('routeApp', 
		// dépendances du "module"
		['ngRoute', 'routeAppControllers', 'angularUtils.directives.dirPagination']);


// configuration du systèmes de routage

app.config([ '$routeProvider', function($routeProvider) {

	// Système de routage
	$routeProvider.when('/search/:input?', {
		templateUrl : '/assets/partials/search.html',
		controller : 'SearchController'
	}).when('/analytics/:input?', {
		templateUrl : '/assets/partials/analytics.html',
		controller : 'AnalyticsController'
	})
	.otherwise({
            redirectTo: '/'
        });
} ]);

// définition des contrôleurs

var routeAppControllers = angular.module('routeAppControllers', []);

routeAppControllers.controller('rootController', function($scope,$routeParams,$location){
	$scope.message = "this is the analyics";
	$scope.input = $routeParams.input;
	$scope.enterTodo = function(input,event){
		if(event.keyCode ==13){ // ENTER_KEY
			$location.path('/search/'+input);
		}
	}
});



routeAppControllers.controller('SearchController', function($scope,$routeParams, $http) {
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
     }
    $scope.pageChangeHandler = function(num) { 
    	$scope.numselectionbypage = (num-1)*$scope.itemPage
    };
// chercher au chargement de la page
    $scope.doSearch();
});


routeAppControllers.controller('AnalyticsController', function($scope,$routeParams,$http){
	$scope.message = "this is the analyics";
	$scope.input = $routeParams.input;
	$scope.commits=[];
    $scope.doGetCommitsFromRepo = function() {
        var httpRequest = $http({
            method : 'GET',
            url : "/repositories/" + $scope.input,
        }).success(function(data, status) {
            $scope.commits = data;
        }).error(function(arg) {
            alert("error ");
        });
         
    };
	$scope.doGetCommitsFromRepo();
});




