angular.module('routeAppControllers').controller('SearchController', function($scope,$routeParams, $http) {
    $scope.results = null;
    $scope.itemPage = 10; // mettre la pagination à 10
    $scope.input = $routeParams.input;
    $scope.doSearch = function(input,liste) {
        var httpRequest = $http({
            method : 'GET',
            url : "/search/" + input,
        }).success(function(data, status) {
        	$scope.results=liste.concat(data);
        }).error(function(arg) {
            alert("error ");
        });
    };
    
    $scope.doSearchByPage = function(input,page,liste) {
        var httpRequest = $http({
            method : 'GET',
            url : "/search/" + input+'?page='+page,
        }).success(function(data, status) {
        	$scope.results=liste.concat(data);
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
    	$scope.numselectionbypage = (num-1)*$scope.itemPage;
    	if(num>($scope.results.length/10)/2){
    		$scope.doSearchByPage($scope.input,2,$scope.results);
    	}
    };
// chercher au chargement de la page
    $scope.doSearch($scope.input,[]);
});