angular.module('routeAppControllers').controller('SearchController',function($scope,$routeParams, serviceRepositories) {
    $scope.results = null;
    $scope.isSearching = true;
    $scope.itemPage = 10; // mettre la pagination à 10
    $scope.input = $routeParams.input;
    $scope.error=null;
    $scope.total_count = 0;
    $scope.max_result=1000;
    
    $scope.doSearch = function(input,liste) {
    	serviceRepositories.getRepositories(input).success(function(data, status) {
    		$scope.total_count = data.total_count;
        	$scope.results=liste.concat(data.items);
        	$scope.isSearching = false;
        }).error(function(arg) {
            $scope.isSearching = false;
            $scope.error = arg;
        });
    };
    
    $scope.doSearchByPage = function(input,page,liste) {
    	serviceRepositories.getRepositoriesPerPage(input,page).success(function(data, status) {
        	$scope.results=liste.concat(data.items);
        }).error(function(arg) {
            $scope.error = arg
        });
    };
    
    $scope.numselectionbypage=0;// pour la mise a jour du selectedRow lors de la pagination
    $scope.selectedRow = null;
    $scope.setClickedRow = function(index){  // mettre le selectedRow à la valeur d'index à chaque clique
    	$scope.selectedRow = index;
    	
     }
    
    var callPage = 1;
    $scope.pageChangeHandler = function(num) { 
    	$scope.numselectionbypage = (num-1)*$scope.itemPage;
    	if(num>($scope.results.length/10)/2 && ($scope.results.length < $scope.max_result || $scope.results.length < $scope.total_count)){
    		$scope.doSearchByPage($scope.input,callPage++,$scope.results);
    	}
    };
// chercher au chargement de la page
    $scope.doSearch($scope.input,[]);
});