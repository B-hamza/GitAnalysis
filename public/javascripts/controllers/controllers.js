'use strict';
// définition des contrôleurs

angular.module('routeAppControllers', []);

angular.module('routeAppControllers').controller('rootController', function($scope,$routeParams,$location){
	$scope.message = "this is the analyics";
	$scope.input = $routeParams.input;
	$scope.page = 1;
	$scope.enterTodo = function(input,event){
		if((event.keyCode ===13 || event.type === "click") && $scope.input!==undefined && $scope.input!==""){ // ENTER_KEY
			$location.path('/search/'+input);
		}
	}
	
	
	
});

