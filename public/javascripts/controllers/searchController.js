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
    	
    	if(document.getElementById('rowAdded')) {
    		document.getElementById("rowAdded").remove();
    	}
        console.log("selectedRow : "+$scope.selectedRow+ " index : "+index);
        var row = document.getElementById('repositories').insertRow(index+2);
        row.setAttribute("id","rowAdded");
        prepareRow(row);
    	
     }
    function prepareRow(row){
        row.setAttribute("height","150");
        var cell1 = row.insertCell(0);
        cell1.setAttribute("colspan",4);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "<repo-infos></repo-infos>";
        cell2.innerHTML = "<a href=\"\#/analytics/"+$scope.results[$scope.selectedRow+$scope.numselectionbypage].id+"\""+" class=\"btn btn-default pull-right\">Analytics</a>"
    }
    
    function githubRepoCard(){
    	/*
    	 * div header contains Name repo and the owner infos
    	 * div content contains description of repo and url 
    	 * div footer contains Forks na Stars
    	 */
    	return "<repo-infos></repo-infos>";
    	
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