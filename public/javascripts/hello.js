'use strict';


// déclaration de l'application routeApp

var app = angular.module('routeApp', 
		// dépendances du "module"
		['ngRoute', 'routeAppControllers']);


// configuration du systèmes de routage

app.config([ '$routeProvider', function($routeProvider) {

	// Système de routage
	$routeProvider.when('/search/:input?', {
		templateUrl : '/assets/partials/search.html',
		controller : 'SearchController'
	}).when('/analytics', {
		templateUrl : '/assets/partials/analytics.html',
		controller : 'AnalyticsController'
	})
	.otherwise({
            redirectTo: '/'
        });;
} ]);

// définition des contrôleurs

var routeAppControllers = angular.module('routeAppControllers', []);

routeAppControllers.controller('SearchController', function($scope,$routeParams, $http) {
    $scope.results = [];
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
    // run the search when the page loads.
    $scope.doSearch();
});


routeAppControllers.controller('AnalyticsController', function($scope){
	$scope.message = "this is the analyics";
});

