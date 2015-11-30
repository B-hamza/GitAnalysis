'use strict';


// déclaration de l'application routeApp

angular.module('routeApp', 
		// dépendances du "module"
		['ngRoute', 'routeAppControllers', 'directives', 'services', 'ui.bootstrap', 'angularUtils.directives.dirPagination']);

google.load('visualization', '1', {
	  packages: ['corechart',"timeline"]
	});

google.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['routeApp']);
});

// configuration du systèmes de routage
angular.module('routeApp').config([ '$routeProvider', function($routeProvider) {

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



